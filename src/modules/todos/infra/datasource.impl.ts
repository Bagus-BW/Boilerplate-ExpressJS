import { PaginationDto, PaginationImpl,  } from "@/modules/shared";
import { CreateTodoDto, GetTodoByIdDto, TodoDataSource, TodoEntity } from "@/modules/todos";
import { AppError, db, ErrorResponse, SuccessResponse } from "@/core";
import { UpdateTodoDto } from "../domain/dtos/updateTodo.dto";
 
export class TodoDatasourceImpl implements TodoDataSource {
  public async getAll(pagination: PaginationDto): Promise<SuccessResponse<TodoEntity[]>> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    const todos = await db.select("*")
      .from("todos")
      .limit(limit)
      .offset(offset);

    const paginationDetails = await PaginationImpl.paginate("todos", pagination);

    return {
      code: 200,
      message: "Todos fetched successfully",
      data: TodoEntity.fromJsonArray(todos),
      pagination: paginationDetails
    };
  }

  public async getById(getByIdRequest: GetTodoByIdDto): Promise<SuccessResponse<TodoEntity>> {
    const { id } = getByIdRequest.params;

    const todo = await db("todos").where({ id }).first();
    if(!todo) {
      throw AppError.notFound("Todo not found");
    }

    return {
      code: 200,
      message: "Todo Found",
      data: TodoEntity.fromJson(todo)
    };
  } 
  
  public async createTodo(createTodoRequest: CreateTodoDto): Promise<SuccessResponse<TodoEntity>> {
    const payload = { ...createTodoRequest.payload, status: false };  

    const [todo] = await db("todos").insert(payload).returning(["id", "title", "description", "status"]);

    return {
      code: 200,
      message: "Successfully created todo",
      data: TodoEntity.fromJson(todo),
    };
  }

  public async updateTodo(updateTodoRequest: UpdateTodoDto): Promise<SuccessResponse<TodoEntity> | ErrorResponse> {
    const { id } = updateTodoRequest.params;
    const { payload } = updateTodoRequest;

    await this.getById(updateTodoRequest);
    
    const [todo] = await db("todos").where({id}).update(payload).returning(["id", "title", "description", "status"]);

    return {
      code: 200,
      message: "Successfully updated todo",
      data: TodoEntity.fromJson(todo)
    };
  }

  public async deleteTodo(getByIdDto: GetTodoByIdDto): Promise<SuccessResponse<TodoEntity> | ErrorResponse> {
    const { data: { id } } = await this.getById(getByIdDto);
    
    const [todo] = await db("todos").where({id}).del().returning(["id", "title", "description", "status"]);

    return {
      code: 200,
      message: "Successfully deleted todo",
      data: TodoEntity.fromJson(todo)
    };
  }
}