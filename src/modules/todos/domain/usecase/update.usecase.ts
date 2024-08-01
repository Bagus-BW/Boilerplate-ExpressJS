import { ErrorResponse, SuccessResponse } from "@/core";
import { TodoEntity, TodoRepository, UpdateTodoDto } from "@/modules/todos";

interface UpdateTodoUseCase {
  execute: (request: UpdateTodoDto) => Promise<SuccessResponse<TodoEntity> | ErrorResponse>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {};

  async execute(request: UpdateTodoDto): Promise<SuccessResponse<TodoEntity> | ErrorResponse> {
    return await this.repository.updateTodo(request);
  }
}