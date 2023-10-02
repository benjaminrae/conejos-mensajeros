export type DomainErrorProps = {
  message: string;
  details?: ErrorDetails;
};

export type ErrorDetails = {
  cause: string;
  origin: string;
  errors: Error[];
};

export type CombineErrorOptions = {
  message: string;
};

export class DomainError extends Error {
  public static combine(errors: DomainError[], message: string): DomainError {
    return new DomainError({
      message,
      details: {
        cause: 'DomainError',
        origin: 'DomainError.combine',
        errors,
      },
    });
  }

  public details?: ErrorDetails;

  constructor(props: DomainErrorProps) {
    super(props.message);
    this.name = this.constructor.name;
    this.details = props.details;
  }
}
