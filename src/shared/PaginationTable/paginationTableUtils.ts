type ColumnIdType = string;
type DataProperty = string | number | boolean | JSX.Element | undefined;

export interface Column {
  id: ColumnIdType;
  label: string;
  align?: 'right';
}

export interface Data extends Record<ColumnIdType, DataProperty> {
  id: string | number;
}

export const DEFAULT_ROWS_PER_PAGE = 10;
