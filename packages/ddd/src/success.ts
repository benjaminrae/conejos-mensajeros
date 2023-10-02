import { type Either } from './either';
import { type Failure } from './failure';

export class Success<L, R> {
  constructor(public readonly value: L) {}

  isSuccess(): this is Success<L, R> {
    return true;
  }

  isFailure(): this is Failure<L, R> {
    return false;
  }
}

export const success = <L, R>(value: L): Either<L, R> =>
  new Success<L, R>(value);
