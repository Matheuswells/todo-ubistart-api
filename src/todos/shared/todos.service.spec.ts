import { Test, TestingModule } from '@nestjs/testing'
import { TodosService } from './todos.service'

describe('TodosService', () => {
  let provider: TodosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile()

    provider = module.get<TodosService>(TodosService)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })
})
