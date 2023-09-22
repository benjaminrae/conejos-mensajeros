import { type Either } from './either';
import { type Success } from './success';

export class Failure<L, R> {
  constructor(public readonly value: L) {
    this.value = value;
  }

  isFailure(): this is Failure<L, R> {
    return true;
  }

  isSuccess(): this is Success<L, R> {
    return false;
  }
}

export const failure = <L, R>(value: L): Either<L, R> =>
  new Failure<L, R>(value);
