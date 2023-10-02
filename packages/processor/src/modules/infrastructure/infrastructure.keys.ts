export class InfrastructureKeys {
  public static readonly RABBITMQ_CLIENT: unique symbol =
    Symbol('RABBITMQ_CLIENT');

  public static readonly SUPABASE_CLIENT: unique symbol =
    Symbol('SUPABASE_CLIENT');

  public static readonly HTTP_CLIENT: unique symbol = Symbol('HTTP_CLIENT');
}
