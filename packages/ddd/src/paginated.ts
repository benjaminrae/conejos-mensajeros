export class Paginated<Entity> {
  readonly count: number;
  readonly page: number;
  readonly limit: number;
  readonly data: Entity[];

  constructor(props: Paginated<Entity>) {
    this.count = props.count;
    this.page = props.page;
    this.limit = props.limit;
    this.data = props.data;
  }
}
