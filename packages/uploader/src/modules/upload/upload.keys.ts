export class UploadKeys {
  public static readonly UPLOAD_WRITE_REPOSITORY: unique symbol = Symbol(
    'UPLOAD_WRITE_REPOSITORY',
  );

  public static readonly UPLOAD_READ_REPOSITORY: unique symbol = Symbol(
    'UPLOAD_READ_REPOSITORY',
  );

  public static readonly UPLOAD_MAPPER: unique symbol = Symbol('UPLOAD_MAPPER');

  public static readonly PROCESSOR_SUBSCRIBER: unique symbol = Symbol(
    'PROCESSOR_SUBSCRIBER',
  );

  public static readonly UPLOAD_TABLE: string = 'uploads';
}
