export type ValueObjectProps = Record<string, unknown>;

export abstract class ValueObject<T extends ValueObjectProps> {
  public static isValueObject(
    valueObject: unknown,
  ): valueObject is ValueObject<ValueObjectProps> {
    return valueObject instanceof ValueObject;
  }

  #props: T;

  constructor(props: T) {
    this.validate(props);
    this.#props = Object.freeze(props);
  }

  public get value(): T {
    const props = structuredClone(this.#props);

    return Object.freeze(props);
  }

  public equals(object?: ValueObject<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    return JSON.stringify(this.#props) === JSON.stringify(object.#props);
  }

  protected abstract validate(props: T): void;
}
