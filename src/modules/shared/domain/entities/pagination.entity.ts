
export class PaginationEntity {
  constructor(
    public total: number,
    public totalPages: number,
    public currentPage: number,
    public nextPage: number | null,
    public prevPage: number | null
  ) {}
} 