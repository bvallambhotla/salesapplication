import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MockService } from '../smart-page/services/mock.service';
import { ApiService } from '../smart-page/services/data.service';
import { forkJoin, timeout } from 'rxjs';
import { FeatureConfig } from '../models/feature-config';
import { LookupService } from '../smart-page/services/lookupservice';
import { SpinnerService } from '../spinner/services/spinner.service';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-sales-performance',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BaseChartDirective],
  templateUrl: './sales-performance.component.html',
  styleUrls: ['./sales-performance.component.scss'],
})
export class SalesPerformanceComponent {
  salespersons: any[] = [];
  sales: any[] = [];
  products: any[] = [];
  discounts: any[] = [];
  data: any[] = [];
  selectedSalespersonId: number = 1;
  quarters: any[] = [];
  pageConfig!: FeatureConfig;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private lookupService: LookupService,
    private spinner: SpinnerService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ config }) => {
      this.pageConfig = config as FeatureConfig;
    });
    this.initializePage();
  }

  initializePage() {
    this.initializeQuarters();
    this.loadData();
  }

  initializeQuarters() {
    const currentYear = new Date().getFullYear();
    this.quarters = [
      { label: 'Q1', start: `${currentYear}-01-01`, end: `${currentYear}-03-31`, totalSales: 0, totalCommission: 0, salesData: [0, 0] },
      { label: 'Q2', start: `${currentYear}-04-01`, end: `${currentYear}-06-30`, totalSales: 0, totalCommission: 0, salesData: [0, 0] },
      { label: 'Q3', start: `${currentYear}-07-01`, end: `${currentYear}-09-30`, totalSales: 0, totalCommission: 0, salesData: [0, 0] },
      { label: 'Q4', start: `${currentYear}-10-01`, end: `${currentYear}-12-31`, totalSales: 0, totalCommission: 0, salesData: [0, 0] },
    ];
  }

  loadData(): void {
    forkJoin({
      lookups: this.lookupService.fetchLookups(),
      sales: this.apiService.getData('sale')
    }).subscribe(response => {
      this.salespersons = response.lookups.salespersons;
      this.sales = response.sales;
      this.calculateTotalSalesAndCommission();
    });
  }

  calculateTotalSalesAndCommission() {
    this.quarters.forEach(quarter => {
      quarter.totalSales = 0;
      quarter.totalCommission = 0;
      quarter.salesData = [0, 0];
    });

    const selectedSales = this.sales.filter(sale => sale.salespersonId === +this.selectedSalespersonId);
    selectedSales.forEach(sale => {
      let salePrice = sale.salePrice;
      const commissionAmount = sale.commission;

      this.quarters.forEach(quarter => {
        const saleDate = new Date(sale.salesDate);
        const startDate = new Date(quarter.start);
        const endDate = new Date(quarter.end);

        if (saleDate >= startDate && saleDate <= endDate) {
          quarter.totalSales += salePrice;
          quarter.totalCommission += commissionAmount;
          quarter.salesData[0] += salePrice; 
          quarter.salesData[1] += commissionAmount;
        }
      });
    });
  }

  isDiscountValid(discount: any, salesDate: string): boolean {
    const saleDate = new Date(salesDate);
    const startDate = new Date(discount.beginDate);
    const endDate = new Date(discount.endDate);
    return saleDate >= startDate && saleDate <= endDate;
  }

  onSalespersonSelect() {
    this.spinner.show();
    this.calculateTotalSalesAndCommission();
    setTimeout(() => {
      this.spinner.hide();
    }, 100)
  }

}
