import { type ValidationType, HttpCode } from "@/core";

interface AppErrorArgs {
	name: string;
	code: HttpCode;
	message: string;
  error_message?: string[] | ValidationType[]
}

export class AppError extends Error {
	public readonly name: string;
	public readonly code: HttpCode;
  public readonly error_message?: string[] | ValidationType[];

	constructor(args: AppErrorArgs) {
		const {name, code, message, error_message,  } = args;
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name ?? "Aplication Error";
    this.code = code;
		this.error_message = error_message;
		
		Error.captureStackTrace(this);
	}

	static badRequest(message: string, error_message: string[] | ValidationType[]): AppError {
		return new AppError({ name: "Bad Request", message, code: HttpCode.BAD_REQUEST, error_message });
	}

	static unauthorized(message: string): AppError {
		return new AppError({ name: "Unauthorized", message, code: HttpCode.UNAUTHORIZED });
	}

	static forbidden(message: string): AppError {
		return new AppError({ name: "Forbidden", message, code: HttpCode.FORBIDDEN });
	}

	static notFound(message: string): AppError {
		return new AppError({ name: "Not Found", message, code: HttpCode.NOT_FOUND });
	}

	static internalServer(message: string): AppError {
		return new AppError({ name: "Internal Server Error", message, code: HttpCode.INTERNAL_SERVER_ERROR });
	}

	static serviceUnavailable(message: string): AppError {
    return new AppError({ name: "Service Unavailable", message, code: HttpCode.SERVICE_UNAVAILABLE });
  }
}