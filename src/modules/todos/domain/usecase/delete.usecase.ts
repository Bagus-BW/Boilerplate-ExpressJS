import { ErrorResponse, SuccessResponse } from "@/core";
import { GetTodoByIdDto, TodoEntity, TodoRepository } from "@/modules/todos";


interface DeleteTodoUseCase {
  execute: (getByIdDto: GetTodoByIdDto) => Promise<SuccessResponse<TodoEntity> | ErrorResponse>;
}

export class DeleteTodo implements DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {};

  async execute(getByIdDto: GetTodoByIdDto): Promise<SuccessResponse<TodoEntity> | ErrorResponse> {
    return await this.repository.deleteTodo(getByIdDto);
  }
}