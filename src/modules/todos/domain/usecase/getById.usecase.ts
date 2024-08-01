import { SuccessResponse } from "@/core";
import { GetTodoByIdDto, TodoEntity, TodoRepository } from "@/modules/todos";

interface GetByIdTodoUseCase {
  execute: (request: GetTodoByIdDto) => Promise<SuccessResponse<TodoEntity>>;
}

export class GetByIdTodo implements GetByIdTodoUseCase {
  constructor(private readonly repository: TodoRepository) {};

  async execute(request: GetTodoByIdDto): Promise<SuccessResponse<TodoEntity>> {
    return await this.repository.getById(request);
  }
}