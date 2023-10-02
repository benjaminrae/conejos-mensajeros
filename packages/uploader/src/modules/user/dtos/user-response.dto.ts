import { User } from '../domain/user.entity';

export class UserResponse {
  id: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.getProps().email;
  }
}
