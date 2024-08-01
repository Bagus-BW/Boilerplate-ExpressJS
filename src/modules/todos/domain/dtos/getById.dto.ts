import { Todo } from "@/modules/todos";

export class GetTodoByIdDto {
  private constructor(public readonly params: Pick<Todo, "id">) {
  } 

  public static getByIdTodo(params: Pick<Todo, "id">): GetTodoByIdDto {
    return new GetTodoByIdDto(params);
  }
}