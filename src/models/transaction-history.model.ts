import {Entity, model, property} from '@loopback/repository';

@model()
export class TransactionHistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  firstNumber: number;

  @property({
    type: 'number',
    required: true,
  })
  secondNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  createdBy: string;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: Date;


  constructor(data?: Partial<TransactionHistory>) {
    super(data);
  }
}

export interface TransactionHistoryRelations {
  // describe navigational properties here
}

export type TransactionHistoryWithRelations = TransactionHistory & TransactionHistoryRelations;
