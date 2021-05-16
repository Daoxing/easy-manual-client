export enum IjoinGroupStatusEnum {
  NOT_JOINED = 'NOT_JOINED',
  APPLIED = 'APPLIED',
  JOINED = 'JOINED',
}

export interface IGroup {
  group_id: string;
  group_nme?: string;
  group_intro?: string;
}
