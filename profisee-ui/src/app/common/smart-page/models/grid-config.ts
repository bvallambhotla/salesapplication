
import { ColumnConfig } from './column-config';

export interface FeatureConfig {
  path: string;
  columns: ColumnConfig[];
  data: any[];
  api: string;
  title: string;
  icon?: string;
  description: string;
}
