import { db } from "@/core";
import { PaginationEntity, PaginationParams } from "@/modules/shared";

export class PaginationImpl {
  public static async paginate(
    tableName: string,
    params: PaginationParams,
  ): Promise<PaginationEntity> {
    const { page, limit } = params;

    const countQuery = await db(tableName).count("* as count").first();
    const totalCount: number = parseInt(countQuery?.count as string, 10) || 0;

    const totalPages: number = Math.ceil(totalCount / limit);

    return {
      total: totalCount,
      totalPages,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }

}