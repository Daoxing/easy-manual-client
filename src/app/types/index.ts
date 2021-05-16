export * from './article';
export * from './group';
export interface IOrder {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface IPage {
  pageNo: number;
  pageCount: number;
}
