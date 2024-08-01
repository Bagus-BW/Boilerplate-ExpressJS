import { z } from "zod";

export const todoSchemas =  z.object({
  title: z.string({required_error: "title is required"}).min(1, { message: "title is required" }),
  description: z.string({ required_error: "description is required" }).min(1, { message: "description is required" })
});