import { SuccessResponse } from "@/core";
import { PaginationDto } from "@/modules/shared";
import { TodoEntity, TodoRepository } from "@/modules/todos";

interface GetTodosUseCase {
  execute: (pagination: PaginationDto) => Promise<SuccessResponse<TodoEntity[]>>;
}

export class GetTodos implements GetTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(pagination: PaginationDto): Promise<SuccessResponse<TodoEntity[]>> {
    return await this.repository.getAll(pagination);
  }
}