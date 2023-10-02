import { type UniqueEntityId } from './unique-entity-id';

export type BaseEntityProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateEntityProps<T> = {
  id: UniqueEntityId;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class Entity<EntityProps> {
  public static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  protected props: EntityProps;
  #id: UniqueEntityId;
  #createdAt: Date;
  #updatedAt: Date;

  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.validate(props);
    this.#id = id;
    this.#createdAt = createdAt ?? new Date();
    this.#updatedAt = updatedAt ?? new Date();
    this.props = props;
  }

  public get id(): string {
    return this.#id.toString();
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  update(props: Partial<EntityProps>) {
    this.#updatedAt = new Date();

    this.props = {
      ...this.props,
      ...props,
    };
  }

  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    if (this.id) {
      return this.id === object.id;
    }

    return false;
  }

  public getProps(): EntityProps & BaseEntityProps {
    const props = structuredClone(this.props);

    return {
      id: this.id.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...props,
    };
  }

  public toObject(): EntityProps & BaseEntityProps {
    return this.getProps();
  }

  protected abstract validate(props: EntityProps): void;
}
