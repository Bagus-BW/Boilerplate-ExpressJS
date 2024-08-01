import { HttpCode, ValidationType } from "@/core"; 
   
 export class ValidationError extends Error {  
  public readonly code: HttpCode;  
  public readonly error_message: ValidationType[];  
   
  constructor(error_message: ValidationType[]) {  
   super("Validation Error");  
   Object.setPrototypeOf(this, new.target.prototype);  
   this.code = 400;  
   this.error_message = error_message;  
   Error.captureStackTrace(this);  
  }  
 }