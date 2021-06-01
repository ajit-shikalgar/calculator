// Uncomment these imports to begin using these cool features!

import {getModelSchemaRef, requestBody} from '@loopback/openapi-v3';
import {repository} from '@loopback/repository';
import {post} from '@loopback/rest';
import {TransactionHistory} from '../models';
import {TransactionHistoryRepository} from '../repositories';

// import {inject} from '@loopback/core';


export class CalculatorControllerController {
  constructor(@repository(TransactionHistoryRepository)
  public transactionHistoryRepository: TransactionHistoryRepository) { }

  @post('/add')
  add(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(TransactionHistory, {partial: true})
      }
    }
  }) transactionHistory: TransactionHistory) {

    transactionHistory.createdBy = 'AjitShikalgar'; // fetch from jwt
    transactionHistory.createdOn = new Date();
    transactionHistory.id = 1;
    this.transactionHistoryRepository.save(transactionHistory);
    return transactionHistory.firstNumber + transactionHistory.secondNumber;
  }

}
