export type UserProps = {
  email: string;
};

export type CreateUserProps = {
  email: string;
};

export type CreateUserCommandProps = {
  email: string;
  password: string;
};

export type UserCredentialsProps = {
  password: string;
  userId: string;
};

export type CreateUserCredentialsProps = {
  password: string;
  userId: string;
};

export type LoginUserCommandProps = {
  email: string;
  password: string;
};
