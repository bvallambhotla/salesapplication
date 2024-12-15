export type ColumnConfig = {
  field: string;
  title: string;
  width?: number | string;
  editable?: true | false;
  visible?: boolean;
  type?: 'text' | 'phone' | 'number' | 'select' | 'date';
  datasource?: string;
  format?: string;
  selectFieldConfig?: {
    labelProperty: string;
    valueProperty: string;
  }
}