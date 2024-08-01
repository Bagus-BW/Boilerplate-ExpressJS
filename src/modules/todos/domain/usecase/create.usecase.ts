import { SuccessResponse } from "@/core";
import { CreateTodoDto, TodoEntity, TodoRepository } from "@/modules/todos";

interface CreateTodoUseCase {
  execute: (request: CreateTodoDto) => Promise<SuccessResponse<TodoEntity>>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {};

  async execute(request: CreateTodoDto): Promise<SuccessResponse<TodoEntity>> {
    return await this.repository.createTodo(request);
  };
}