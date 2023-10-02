import { Query } from '@conejos-mensajeros/ddd';

export class GetUploadsQuery extends Query {
  ownerId: string;

  constructor(ownerId: string) {
    super();
    this.ownerId = ownerId;
  }
}
