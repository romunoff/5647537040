type ColumnIdType = string;
type DataProperty = string | number | boolean | JSX.Element | undefined;
export type DataValueTypes = number | string | boolean | undefined;
type ColumnFormat<T> = (value: DataValueTypes, row: T) => string | JSX.Element | 0 | false | undefined;

export interface Column {
  id: ColumnIdType;
  label: string;
  align?: 'right';
  format?: ColumnFormat<Data>;
}

export interface Data extends Record<ColumnIdType, DataProperty> {
  id: string | number;
}

export const DEFAULT_ROWS_PER_PAGE = 10;
