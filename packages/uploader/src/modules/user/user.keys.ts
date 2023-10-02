export class UserKeys {
  public static readonly USER_WRITE_REPOSITORY: unique symbol =
    Symbol('USER_REPOSITORY');

  public static readonly USER_READ_REPOSITORY: unique symbol =
    Symbol('USER_REPOSITORY');

  public static readonly USER_CREDENTIALS_WRITE_REPOSITORY: unique symbol =
    Symbol('USER_CREDENTIALS_WRITE_REPOSITORY');

  public static readonly USER_CREDENTIALS_READ_REPOSITORY: unique symbol =
    Symbol('USER_CREDENTIALS_READ_REPOSITORY');

  public static readonly USER_MAPPER: unique symbol = Symbol('USER_MAPPER');

  public static readonly USER_CREDENTIALS_MAPPER: unique symbol = Symbol(
    'USER_CREDENTIALS_MAPPER',
  );

  public static readonly PASSWORD_SERVICE: unique symbol =
    Symbol('PASSWORD_SERVICE');

  public static readonly USER_TABLE: string = 'users';

  public static readonly USER_CREDENTIALS_TABLE: string = 'user_credentials';
}
