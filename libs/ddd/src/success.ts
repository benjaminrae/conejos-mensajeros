import { type Either } from './either';
import { type Failure } from './failure';

export class Success<L, R> {
  constructor(public readonly value: R) {
    this.value = value;
  }

  isSuccess(): this is Failure<L, R> {
    return false;
  }

  isFailure(): this is Success<L, R> {
    return true;
  }
}

export const success = <L, R>(value: R): Either<L, R> =>
  new Success<L, R>(value);
