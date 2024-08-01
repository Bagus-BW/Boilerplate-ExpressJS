import { z } from "zod";

export const paginationSchemas = z.object({
  page: z.number().int().min(1, { message: "Page must be greater than zero" }),
  limit: z.number().int().min(1, { message: "Limit must be greater than zero" }),
});

export type PaginationParams = z.infer<typeof paginationSchemas>;