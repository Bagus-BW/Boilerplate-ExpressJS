import { PaginationEntity } from "@/modules/shared";

export interface SuccessResponse<T> {
  code: number,
  message: string, 
	data: T,
  pagination?: PaginationEntity
}

export interface ValidationType {
	field: string;
	msg: string;
}

export interface ErrorResponse {
	name: string;
  code: number,
  error_message?: string | string[] | ValidationType[];
  message: string, 
}