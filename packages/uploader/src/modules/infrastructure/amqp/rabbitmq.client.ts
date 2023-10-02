import { Logger } from '@conejos-mensajeros/ddd';
import { Injectable } from '@nestjs/common';
import amqplib, { connect } from 'amqplib';
import { AmqpConfig } from 'src/configs/amqp.config';

@Injectable()
export class RabbitMQClient {
  #connection: amqplib.Connection;
  #defaultChannel: amqplib.Channel;
  #connected: boolean = false;

  constructor(
    private readonly config: AmqpConfig,
    private readonly logger: Logger,
  ) {}

  async connect(): Promise<void> {
    try {
      this.logger.debug('Connecting to RabbitMQ');
      this.#connection = await connect(
        {
          protocol: 'amqp',
          hostname: this.config.host,
          port: this.config.port,
          username: this.config.username,
          password: this.config.password,
          frameMax: 0,
          heartbeat: 0,
          vhost: '/',
          locale: 'en_GB',
        },
        {
          clientProperties: {
            connection_name: 'uploader',
          },
        },
      );

      this.#defaultChannel = await this.#connection.createChannel();
      this.#connected = true;
      this.logger.debug('Connected to RabbitMQ');
    } catch (error) {
      this.logger.error('Error connecting to RabbitMQ', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      this.logger.debug('Disconnecting from RabbitMQ');
      await this.#connection.close();
      this.#connected = false;
    } catch (error) {
      this.logger.error('Error disconnecting from RabbitMQ', error);
      throw error;
    }
  }

  get connection(): amqplib.Connection {
    if (!this.#connected) {
      throw new Error('Not connected');
    }

    return this.#connection;
  }

  get defaultChannel(): amqplib.Channel {
    if (!this.#connected) {
      throw new Error('Not connected');
    }

    return this.#defaultChannel;
  }

  async createChannel(): Promise<amqplib.Channel> {
    try {
      this.logger.debug('Creating channel');
      return await this.#connection.createChannel();
    } catch (error) {
      this.logger.error('Error creating channel', error);
      throw error;
    }
  }
}
