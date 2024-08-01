import { ErrorResponse, SuccessResponse } from "@/core";
import { PaginationDto } from "@/modules/shared";
import { CreateTodoDto, GetTodoByIdDto, TodoEntity, UpdateTodoDto } from "@/modules/todos";

export abstract class TodoRepository {
  abstract getAll(pagination: PaginationDto): Promise<SuccessResponse<TodoEntity[]>>;
  abstract getById(request: GetTodoByIdDto): Promise<SuccessResponse<TodoEntity>>;
  abstract createTodo(request: CreateTodoDto): Promise<SuccessResponse<TodoEntity>>;
  abstract updateTodo(request: UpdateTodoDto): Promise<SuccessResponse<TodoEntity> | ErrorResponse>;
  abstract deleteTodo(getByIdDto: GetTodoByIdDto): Promise<SuccessResponse<TodoEntity> | ErrorResponse>;
}