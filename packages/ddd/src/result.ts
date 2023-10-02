export type ResultProps<T> = {
  isSuccess: boolean;
  error?: T | string;
  value?: T;
};

export class Result<T> {
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>({ isSuccess: true, value });
  }

  public static fail<U>(error: U | string): Result<U> {
    return new Result<U>({ isSuccess: false, error });
  }

  public static combine(results: Array<Result<unknown>>): Result<unknown> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }

    return Result.ok();
  }

  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: T | string;
  #value?: T;

  constructor(props: ResultProps<T>) {
    this.validate(props);

    this.isSuccess = props.isSuccess;
    this.isFailure = !props.isSuccess;

    if (props.error) {
      this.error = props.error;
    }

    if (props.value) {
      this.#value = props.value;
    }

    Object.freeze(this);
  }

  public get value(): T {
    if (!this.isSuccess) {
      throw new Error('cannot retrieve value of an error result');
    }

    const value = structuredClone(this.#value);

    return this.value;
  }

  public errorValue(): T {
    return this.error as T;
  }

  protected validate(props: ResultProps<T>): void {
    if (props.isSuccess && props.error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      );
    }

    if (!props.isSuccess && !props.error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      );
    }

    if (props.isSuccess && !props.value) {
      throw new Error(
        'InvalidOperation: A successful result needs to contain a value',
      );
    }
  }
}
