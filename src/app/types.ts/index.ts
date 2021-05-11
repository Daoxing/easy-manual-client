export * from './article';
export interface IOrder {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface IPage {
  pageNo: number;
  pageCount: number;
}
