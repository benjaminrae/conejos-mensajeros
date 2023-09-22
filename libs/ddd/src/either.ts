import { type Failure } from './failure';
import { type Success } from './success';

export type Either<L, R> = Failure<L, R> | Success<L, R>;
