import { ColumnConfig } from "../smart-page/models/column-config";

export interface FeatureConfig {
    path: string;
    columns: ColumnConfig[];
    data: any[];
    api: string;
    title: string;
    icon?: string;
    description: string;
    key: string;
    operations?: {
      create?: boolean;
      update?: boolean;
      delete?: boolean;
    },
    component: any;
    enableGridFilter?: boolean;
    filterFields?: ColumnConfig[];
    filterType?: any;
    applyFilter?: any;
  }