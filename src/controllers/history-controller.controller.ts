import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {TransactionHistory} from '../models';
import {TransactionHistoryRepository} from '../repositories';

export class HistoryControllerController {
  constructor(
    @repository(TransactionHistoryRepository)
    public transactionHistoryRepository: TransactionHistoryRepository,
  ) { }

  @post('/transaction-histories')
  @response(200, {
    description: 'TransactionHistory model instance',
    content: {'application/json': {schema: getModelSchemaRef(TransactionHistory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionHistory, {
            title: 'NewTransactionHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    transactionHistory: Omit<TransactionHistory, 'id'>,
  ): Promise<TransactionHistory> {
    return this.transactionHistoryRepository.create(transactionHistory);
  }

  @get('/transaction-histories/count')
  @response(200, {
    description: 'TransactionHistory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TransactionHistory) where?: Where<TransactionHistory>,
  ): Promise<Count> {
    return this.transactionHistoryRepository.count(where);
  }

  @get('/transaction-histories')
  @response(200, {
    description: 'Array of TransactionHistory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TransactionHistory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TransactionHistory) filter?: Filter<TransactionHistory>,
  ): Promise<TransactionHistory[]> {
    return this.transactionHistoryRepository.find(filter);
  }

  @patch('/transaction-histories')
  @response(200, {
    description: 'TransactionHistory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionHistory, {partial: true}),
        },
      },
    })
    transactionHistory: TransactionHistory,
    @param.where(TransactionHistory) where?: Where<TransactionHistory>,
  ): Promise<Count> {
    return this.transactionHistoryRepository.updateAll(transactionHistory, where);
  }

  @get('/transaction-histories/{id}')
  @response(200, {
    description: 'TransactionHistory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TransactionHistory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TransactionHistory, {exclude: 'where'}) filter?: FilterExcludingWhere<TransactionHistory>
  ): Promise<TransactionHistory> {
    return this.transactionHistoryRepository.findById(id, filter);
  }

  @patch('/transaction-histories/{id}')
  @response(204, {
    description: 'TransactionHistory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionHistory, {partial: true}),
        },
      },
    })
    transactionHistory: TransactionHistory,
  ): Promise<void> {
    await this.transactionHistoryRepository.updateById(id, transactionHistory);
  }

  @put('/transaction-histories/{id}')
  @response(204, {
    description: 'TransactionHistory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transactionHistory: TransactionHistory,
  ): Promise<void> {
    await this.transactionHistoryRepository.replaceById(id, transactionHistory);
  }

  @del('/transaction-histories/{id}')
  @response(204, {
    description: 'TransactionHistory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transactionHistoryRepository.deleteById(id);
  }
}
