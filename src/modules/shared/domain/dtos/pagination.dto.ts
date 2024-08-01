import { AppError, type ValidationType } from "@/core";
import { type CoreDto, paginationSchemas } from "@/modules/shared";

export class PaginationDto implements CoreDto<PaginationDto> {
  public readonly page: number;
  public readonly limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
    this.validate();
  };

  public validate(): void {
		const result = paginationSchemas.safeParse({ page: this.page, limit: this.limit });
		if (!result.success) {
      const errors: ValidationType[] = result.error.errors.map(err => ({
        field: err.path[0] as string,
        msg: err.message
      }));
      throw AppError.badRequest("Error validating pagination", errors);
    }
	};

	public static create(object: Record<string, unknown>): PaginationDto {
		const { page, limit } = object;
		return new PaginationDto(page as number, limit as number);
	}
};