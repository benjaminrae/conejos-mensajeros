import { env } from './env';

export type AmqpConfig = {
  port: number;
  username: string;
  password: string;
  host: string;
};

export const amqpConfig: AmqpConfig = {
  port: Number(env.RMQ_PORT),
  username: env.RMQ_USER,
  password: env.RMQ_PASSWORD,
  host: env.RMQ_HOST,
};
