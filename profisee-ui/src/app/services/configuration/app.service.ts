import { Injectable } from "@angular/core";
import { MenuItem } from "../../common/models/menu-item";
import { FeatureConfig } from "../../common/models/feature-config";
import { SalesPerformanceComponent } from '../../common/report/sales-performance.component';
import { SmartPageComponent } from '../../common/smart-page/components/smart-page.component';

@Injectable({
	providedIn: 'root'
})
export class AppConfigurationService {

	private features: FeatureConfig[] = [
		{ // customers
			api: 'customer',
			path: 'customers',
			key: 'customerId',
			title: 'Customers',
			icon: 'people-fill',
			columns: [
				{ field: 'customerId', title: '', visible: false, editable: false },
				{ field: 'firstName', title: 'First Name', editable: true, type: 'text' },
				{ field: 'lastName', title: 'Last Name', editable: true, type: 'text' },
				{ field: 'address', title: 'Address', editable: true, type: 'text' },
				{ field: 'phone', title: 'Phone', editable: true, type: 'phone' }
			],
			data: [],
			description: 'Displays a list of customers.',
			component: SmartPageComponent
		},
		{ // Discounts
			api: 'discount',
			path: 'discounts',
			title: 'Discounts',
			key: 'discountId',
			icon: 'piggy-bank',
			columns: [
				{ field: 'discountId', title: '', visible: false, editable: false },
				{ field: 'product.name', title: 'Product', editable: false, type: 'text' },
				{ field: 'productId', visible: false, title: 'Product', editable: true, type: 'select', datasource: 'products', selectFieldConfig: { labelProperty: 'name', valueProperty: 'productId' } },
				{ field: 'beginDate', title: 'Starts On', editable: true, type: 'date', format: 'date' },
				{ field: 'endDate', title: 'Ends On', editable: true, type: 'date', format: 'date' },
				{ field: 'discountPercentage', title: 'Discount %', editable: true, type: 'number', format: 'n2' }
			],
			data: [],
			description: 'Check all the discounts here.',
			component: SmartPageComponent
		},
		{ // Products
			api: 'product',
			path: 'products',
			title: 'Products',
			key: 'productId',
			icon: 'boxes',
			columns: [
				{ field: 'productId', title: '', visible: false, editable: false },
				{ field: 'name', title: 'Name', editable: true, type: 'text' },
				{ field: 'manufacturer', title: 'Manufacturer', editable: true, type: 'text' }, //todo: could be a dropdown in UI
				{ field: 'style', title: 'Style', editable: true, type: 'text' }, //todo: this could be a dropdown defined in UI
				{ field: 'purchasePrice', title: 'Purchase Price', editable: true, type: 'number', format: 'n2' },
				{ field: 'salePrice', title: 'Sale Price', editable: true, type: 'number', format: 'n2' },
				{ field: 'qtyOnHand', title: 'Quantity', editable: true, type: 'number', format: 'n2' },
				{ field: 'commissionPercentage', title: 'Commission %', editable: true, type: 'number', format: 'n2' } // todo: take min and max
			],
			data: [],
			description: 'Manage your Products.',
			operations: {
				update: true,
				delete: false
			},
			component: SmartPageComponent
		},
		{ // Sales
			api: 'sale',
			path: 'sales',
			title: 'Sales',
			key: 'saleId',
			icon: 'cash-stack',
			columns: [
				{ field: 'saleId', title: '', visible: false, editable: false },
				{ field: 'product.name', title: 'Product', editable: false, type: 'text' },
				{ field: 'productId', title: 'Product', editable: true, visible: false, datasource: 'products', type: 'select' },
				{ field: 'customerId', title: 'Customer', editable: true, visible: false, datasource: 'customers', type: 'select' },
				{ field: 'salespersonId', title: 'Sales Person', editable: true, visible: false, datasource: 'salespersons', type: 'select' },
				{ field: 'salesperson.name', title: 'Sales Person', editable: false, type: 'text' },
				{ field: 'customer.name', title: 'Customer', editable: false, type: 'text' },
				{ field: 'salesDate', title: 'Sales Date', editable: true, type: 'date', format: 'date' },
				{ field: 'salePrice', title: 'Sale Price', editable: true, type: 'number', format: 'n2' },
				{ field: 'commission', title: 'Commission Earned', editable: false, type: 'number', format: 'n2' }
			],
			data: [],
			description: 'Manage your Sales.',
			operations: {
				create: true,
				delete: false
			},
			component: SmartPageComponent,
			enableGridFilter: true,
			applyFilter: [{ type: 'dateRange', fields: ['salesDate'] }],
			filterType: [{
				dateRange: [
					{ field: 'startDate', title: 'Start Date', type: 'date' },
					{ field: 'endDate', title: 'End Date', type: 'date' }]
			}
			]
		},
		{ // Sales Person
			api: 'salesperson',
			path: 'salespersons',
			title: 'Sales Persons',
			key: 'salespersonId',
			icon: 'people-fill',
			columns: [
				{ field: 'id', title: '', visible: false, editable: false },
				{ field: 'firstName', title: 'First Name', editable: true, type: 'text' },
				{ field: 'lastName', title: 'Last Name', editable: true, type: 'text' },
				{ field: 'address', title: 'Address', editable: true, type: 'text' },
				{ field: 'phone', title: 'Phone', editable: true, type: 'text' },
				{ field: 'startDate', title: 'Start Date', editable: true, type: 'date', format: 'date' },
				{ field: 'terminationDate', title: 'Termination Date', editable: true, type: 'date', format: 'date' },
				{ field: 'manager.name', title: 'Manager', editable: false, type: 'text' },
				{ field: 'managerId', title: 'Manager', visible: false, editable: true, datasource: 'salespersons', type: 'select', selectFieldConfig: { labelProperty: 'title', valueProperty: 'id' } }
			],
			data: [],
			description: 'Manage your Sales.',
			operations: {
				update: true,
				delete: false
			},
			component: SmartPageComponent
		},
		{ // Performance
			api: '',
			path: 'salesPerformance',
			title: 'Sales Performance Report',
			icon: 'bar-chart-fill',
			key: '',
			columns: [
				{ field: 'id', title: '', visible: false, editable: false },
			],
			data: [],
			description: 'Sales Performance Report.',
			component: SalesPerformanceComponent
		},
	];

	public get Features(): FeatureConfig[] {
		return this.features;
	}

	public get MenuItems(): MenuItem[] {
		return this.features.map(({ title, path }) => ({ title, path }));
	}
}