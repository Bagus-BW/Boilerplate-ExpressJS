import { type NextFunction, type Request, type Response } from "express";
import { type ErrorResponse, AppError } from "@/core";

export class ErrorMiddleware {
  public static handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    if(error instanceof AppError) {
      const { name, code, message, error_message } = error;
      
      if(Array.isArray(error_message)) {
        res.status(code).json({name, code, message, error_message });
      }else{
        res.status(code).json({name, code, message });
      }
    } else {
      let name: string;
			let message: string;
      let code: number;
      
      if (error instanceof Error && (error as { code?: string }).code === "ECONNREFUSED") {
        const serviceUnavailableError = AppError.serviceUnavailable("Connection to service was refused.");
        name = serviceUnavailableError.name;
        code = serviceUnavailableError.code;
        message = serviceUnavailableError.message;
      }else{
        name = "Internal Server Error";
        code = (error as { statusCode?: number }).statusCode ?? 500;
        message = error instanceof Error ? error.message : "An internal server error occurred";
      }

      res.status(code).json({name, code, message});
    }

    next();
  };
};