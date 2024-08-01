import { AppError, ValidationType } from "@/core";
import { CoreDto } from "@/modules/shared";
import { Todo, todoSchemas } from "@/modules/todos";

export class CreateTodoDto implements CoreDto<CreateTodoDto> {
  private constructor(public readonly payload: Pick<Todo, "title" | "description">) {
    this.validate();
  } 

  public validate(): void {
    let errors: ValidationType [] = [];

    const result = todoSchemas.safeParse(this.payload);
    if (!result.success) {
      errors = result.error.errors.map(err => {
        return {
          field: err.path[0] as string,
          msg: err.message
        };
      });
    }

    const extraFields = Object.keys(this.payload).filter(key => !Object.prototype.hasOwnProperty.call(todoSchemas.shape, key));
    if (extraFields.length > 0) {
      errors = extraFields.map(field => ({
        field: field,
        msg: `${field} is not allowed in the request`
      }));
    }

    if (errors.length > 0) {
      throw AppError.badRequest("Error validating payload", errors);
    }
  }

  public static createTodo(payload: Pick<Todo, "title" | "description">): CreateTodoDto {
    return new CreateTodoDto(payload);
  }
}