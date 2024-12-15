
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/data.service';
import { NgbModal, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, GridOptions, GridApi, ModuleRegistry } from 'ag-grid-community';
import { FeatureConfig } from '../../models/feature-config';
import { LookupService } from '../services/lookupservice';
import { ColumnConfig } from '../models/column-config';
import { tap, catchError, of } from 'rxjs';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'profisee-smart-page',
  templateUrl: './smart-page.component.html',
  styleUrls: ['./smart-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    NgbModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe]
})
export class SmartPageComponent implements OnInit {
  data: any[] = [];
  form!: FormGroup;
  editForm!: FormGroup;
  filterForm!: FormGroup;
  editingItem: any;
  filterItem: any = {};
  configPath: string = '';
  commandWidth = 200;
  gridOptions!: GridOptions;
  pageConfig!: FeatureConfig;
  selectOptions: any = {};

  private gridApi!: GridApi;

  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('filterModal') filterModal!: TemplateRef<any>; 

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private lookupService: LookupService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ config }) => {
      this.initializeGrid(config as FeatureConfig);
      this.createForm();
      if(config?.enableGridFilter) {
        this.createFilterForm();
      }
    });
  }

  private initializeGrid(pageConfig: FeatureConfig): void {
    this.pageConfig = pageConfig;
    this.gridOptions = {
      columnDefs: [
        ...this.pageConfig.columns.map(col => ({
          headerName: col.title,
          field: col.field,
          editable: col.editable,
          hide: col.visible === false,
          format: col.format,
          valueFormatter: this.getFormatter(col),
          tooltipField: col.field
        })),
        {
          headerName: 'Actions',
          cellRenderer: this.actionCellRenderer.bind(this),
          sortable: false,
          filter: false
        }
      ],
      rowData: this.data,
      onCellValueChanged: this.onCellValueChanged.bind(this),
      onGridReady: (params: any) => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.loadData();
      },
    };
  }
  getFormatter(col: ColumnConfig): any {
    switch (col.format) {
      case 'n2':
        return this.decimalFormatter;
      case 'date':
        return this.dateFormatter.bind(this);   
      default:
        break;
    }
  }

  private actionCellRenderer(params: any): HTMLDivElement {
    const container = document.createElement('div');

    if (this.pageConfig.operations?.update) {
      const editButton = document.createElement('button');
      editButton.classList.add('btn', 'btn-primary', 'me-2');
      editButton.innerHTML = '<i class="bi bi-pencil"></i>';
      editButton.style.backgroundColor = '#0d6efd';
      editButton.style.borderColor = '#0d6efd';
      editButton.setAttribute('ngbTooltip', 'Edit');
      editButton.addEventListener('click', () => this.openEditForm(params.data));
      container.appendChild(editButton);
    }

    if (this.pageConfig.operations?.delete) {
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
      deleteButton.setAttribute('ngbTooltip', 'Delete');
      deleteButton.addEventListener('click', () => this.deleteRow(params.data));
      container.appendChild(deleteButton);
    }

    return container;
  }

  openEditForm(item: any = {}): void {
    this.editingItem = { ...item };
    this.editForm.patchValue(this.editingItem);
    this.modalService.open(this.editModal);
  }

  private createForm(): void {
    const group = this.editFormFields.reduce((acc, col) => {
      acc[col.field] = ['', col.editable ? [Validators.required] : []];
      return acc;
    }, {} as any);
    this.editForm = this.fb.group(group);
  }

  private createFilterForm(): void {
    const group = this.filterFormFields?.reduce((acc:any, col:any) => {
      acc[col.field] = ['', col?.editable ? [Validators.required] : []];
      return acc;
    }, {} as any);
    this.filterForm = this.fb.group(group);
  }

  private onCellValueChanged(e: any): void { console.log('Cell value changed', e); }

  public save(): void {
    this.editingItem[this.pageConfig.key] ? this.saveEdit(): this.create()
  }

  private create(): void {
    Object.assign(this.editingItem, this.editForm.value);
    this.apiService.createData(this.pageConfig.api, this.editingItem)
      .pipe(
        tap(() => {
          this.editingItem = null; 
          this.loadData();
          this.modalService.dismissAll();
        }),
        catchError((err) => {
          console.error('Create failed', err);
          return of(null); 
        }
    )).subscribe();
  }

  private saveEdit(): void {
    Object.assign(this.editingItem, this.editForm.value);
    this.apiService.updateData(this.pageConfig.api, 0, this.editingItem)
      .pipe(
        tap(() => {
          this.editingItem = null; 
          this.loadData();
          this.modalService.dismissAll();
        }),
        catchError((err) => {
          console.error('Update failed', err);
          return of(null); 
        }
    )).subscribe();
  }

  private deleteRow(item: any): void {
    //Todo: Find the correct API and update
    //this.gridOptions.api.updateRowData({ remove: [item] });
  }

  //#region Data APIs

  loadData(): void {
    this.apiService.getData(this.pageConfig.api)
      .subscribe((data) => {
        this.data = data;
        this.gridApi.setGridOption('rowData', this.data)
      });
  }

  saveItem(): void {
    if (this.editingItem.id) {
      this.apiService.updateData(this.pageConfig.api, this.editingItem.id, this.form.value)
        .subscribe(() => {
          this.loadData();
        });
    }
    else {
      this.apiService.createData(this.pageConfig.api, this.form.value)
        .subscribe(() => {
          this.loadData();
        });
    }
    this.modalService.dismissAll();
  }

  deleteItem(id: number): void {
    this.apiService.deleteData(this.pageConfig.api, id).subscribe(() => { this.loadData(); });
  }

  //#endregion

  openModal(template: TemplateRef<any>, item?: any): void {
    this.editingItem = item ? { ...item } : {};
    this.form.reset(this.editingItem);
    this.modalService.open(template, { size: 'lg' });
  }

  get editFormFields() {
    return this.pageConfig.columns.filter(x => x.editable);
  }


  get filterFormFields() {
    const applyFilter = this.pageConfig?.applyFilter?.[0];
    const filterType = this.pageConfig?.filterType?.[0];
    
    if (applyFilter && filterType) {
      return filterType[applyFilter.type] || [];
    }
    return [];
  }

  //#region Grid Formatters

  private decimalFormatter(params: any): string {
    return params.value != null ? params.value.toFixed(2) : '';
  }

  private dateFormatter(params: any): string | null {
    return params.value != null
      ? this.datePipe.transform(params.value, 'MM/dd/yyyy')
      : null;
  }

  //#endregion

  //#region Lookups

  getSelectOptions(field: any): any[] {
    if (!this.selectOptions[field.datasource]) {
      const options = this.lookupService.getLookup(field.datasource);
      this.selectOptions[field.datasource] = this.formatSelectOptions(options, field.selectFieldConfig);
    }
    return this.selectOptions[field.datasource] || [];
  }

  private formatSelectOptions(data: any[], config: any): any[] {
    return data.map(item => {
      return {
        label: item[config?.labelProperty || 'title'],
        value: item[config?.valueProperty || 'id']
      };
    });
  }

  //#endregion

  openFilterPopup(): void {
    this.modalService.open(this.filterModal, { size: 'md' });
  }

  applyFilter(): void {
    Object.assign(this.filterItem, this.filterForm.value);
  
    const filteredData = this.data.filter((item) => {
      const dateRangeFilterConfig = this.pageConfig?.applyFilter?.[0];
  
      if (dateRangeFilterConfig?.type === 'dateRange' && dateRangeFilterConfig?.fields) {
        //Below should be handle dyanmically based on setting from feature config
        const startDate = new Date(this.filterItem['startDate']);
        const endDate = new Date(this.filterItem['endDate']);
        const salesDate = new Date(item['salesDate']);
  
        if (startDate && endDate) {
          return salesDate >= startDate && salesDate <= endDate;
        } else if (startDate) {
          return salesDate >= startDate;
        } else if (endDate) {
          return salesDate <= endDate;
        }
      }
  
      return this.pageConfig?.applyFilter?.[0]?.fields?.every((field:any) => {
        const value = this.filterItem[field];
        const itemValue = item[field];
  
        switch (field.type) {
          case 'text':
            return value ? itemValue?.toLowerCase().includes(value.toLowerCase()) : true;
  
          case 'number':
            return value !== null && value !== undefined ? itemValue === value : true;
  
          case 'date':
            return value ? new Date(itemValue).toDateString() === new Date(value).toDateString() : true;
  
          default:
            return true;
        }
      });
    });
  
    this.gridApi.setGridOption('rowData', filteredData);
    this.modalService.dismissAll();
  }
  
}

