export interface CommonReducerStateType {
  loading?: boolean;
  loaded?: boolean;
  success?: boolean;
  error?: any;
}

export interface ListState<T> extends CommonReducerStateType {
  list: T[];
  total?: number;
}
