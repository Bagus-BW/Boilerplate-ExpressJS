import { ErrorResponse, SuccessResponse } from "@/core";
import { PaginationDto } from "@/modules/shared";
import { CreateTodoDto, GetTodoByIdDto, TodoDataSource, TodoEntity, TodoRepository } from "@/modules/todos";
import { UpdateTodoDto } from "../domain/dtos/updateTodo.dto";


export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasource: TodoDataSource) {}

  async getAll(pagination: PaginationDto): Promise<SuccessResponse<TodoEntity[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getById(request: GetTodoByIdDto): Promise<SuccessResponse<TodoEntity>> {
    return await this.datasource.getById(request);
  }

  async createTodo(request: CreateTodoDto): Promise<SuccessResponse<TodoEntity>> {
    return await this.datasource.createTodo(request);
  }

  async updateTodo(request: UpdateTodoDto): Promise<SuccessResponse<TodoEntity> | ErrorResponse> {
    return await this.datasource.updateTodo(request);
  }
  
  async deleteTodo(getByIdDto: GetTodoByIdDto): Promise<SuccessResponse<TodoEntity> | ErrorResponse> {
    return await this.datasource.deleteTodo(getByIdDto);
  }
}