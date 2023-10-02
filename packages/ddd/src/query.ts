export type QueryMetadata = Record<string, unknown>;

export type Order = {
  field: string;
  direction: 'ASC' | 'DESC';
};

export type Pagination = {
  limit: number;
  offset: number;
  order: Order;
  page: number;
};

export type PaginatedQueryProps<T> = T & {
  pagination: Pagination;
  metadata?: QueryMetadata;
};

export class Query {
  #metadata: QueryMetadata;

  constructor(metadata?: QueryMetadata) {
    this.#metadata = metadata ?? {};
  }

  get metadata(): QueryMetadata {
    const metadata = structuredClone(this.#metadata);

    return metadata;
  }
}

export class PaginatedQuery<Entity> extends Query {
  #pagination: Pagination;

  constructor(props: PaginatedQueryProps<Entity>) {
    super(props.metadata);
    this.#pagination = props.pagination;
  }

  get pagination(): Pagination {
    const pagination = structuredClone(this.#pagination);

    return pagination;
  }
}
