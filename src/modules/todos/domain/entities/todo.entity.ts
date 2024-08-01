import { Todo } from "../types";

export class TodoEntity {
  constructor(
    public id: Todo["id"],
    public title: Todo["title"],
    public description: Todo["description"],
    public status: Todo["status"]
  ) {}

  public static fromJson(obj: Todo): TodoEntity {
    return new TodoEntity(
      obj.id,
      obj.title,
      obj.description,
      obj.status
    );
  }

  public static fromJsonArray(objs: Todo[]): TodoEntity[] {
    return objs.map(TodoEntity.fromJson);
  }
} 