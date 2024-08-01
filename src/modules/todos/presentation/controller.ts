import { type NextFunction, type Request, type Response } from "express";
import { CreateTodo, CreateTodoDto, DeleteTodo, GetByIdTodo, GetTodoByIdDto, GetTodos, Todo, TodoEntity, TodoRepository, UpdateTodo, UpdateTodoDto } from "@/modules/todos";
import { ErrorResponse, ONE, SuccessResponse, TEN } from "@/core";
import { PaginationDto } from "@/modules/shared";

interface RequestQuery {
	page: string;
	limit: string;
}

export class TodoController {
  constructor(private readonly repository: TodoRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<TodoEntity[]>>,
    next: NextFunction
  ): void => {
    const { page = ONE, limit = TEN } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit });
    new GetTodos(this.repository)
      .execute(paginationDto)
      .then(result => res.json(result))
      .catch(err => {
        next(err);
      });
  };

  public getById = (
    req: Request<Pick<Todo, "id">, unknown, unknown, unknown>,
    res: Response<SuccessResponse<TodoEntity>>,
    next: NextFunction
  ): void => {
    const getByIdDto = GetTodoByIdDto.getByIdTodo(req.params);
    new GetByIdTodo(this.repository)
      .execute(getByIdDto)
      .then(result => res.json(result))
      .catch(err => {
        next(err);
      });
  };

  public createTodo = (
    req: Request<unknown, unknown, Pick<Todo, "title" | "description">>,
    res: Response<SuccessResponse<TodoEntity>>,
    next: NextFunction
  ): void => {
    const createTodoDto = CreateTodoDto.createTodo(req.body);
    new CreateTodo(this.repository) 
      .execute(createTodoDto)
      .then(result => res.json(result))
      .catch(err => {
        next(err);
      });
  };

  public updateTodo = (
    req: Request<Pick<Todo, "id">, unknown, Omit<Todo, "id">>,
    res: Response<SuccessResponse<TodoEntity> | ErrorResponse>,
    next: NextFunction
  ): void => {
    const updateTodoDto = UpdateTodoDto.updateTodo(req.params, req.body);
    new UpdateTodo(this.repository) 
      .execute(updateTodoDto)
      .then(result => res.json(result))
      .catch(err => {
        next(err);
      });
  };

  public deleteTodo = (
    req: Request<Pick<Todo, "id">, unknown, unknown>,
    res: Response<SuccessResponse<TodoEntity> | ErrorResponse>,
    next: NextFunction
  ): void => {
		const getTodoByIdDto = GetTodoByIdDto.getByIdTodo(req.params);
    new DeleteTodo(this.repository)
      .execute(getTodoByIdDto)
      .then(result => res.json(result))
      .catch(err => {
        next(err);
      });
  };
};