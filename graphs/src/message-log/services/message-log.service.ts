import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KafkaMessage } from 'kafkajs';

import { ConsumedMessage } from '../entities/consumed-message.entity';

@Injectable()
export class MessageLogService {
  constructor(
    @InjectRepository(ConsumedMessage)
    private readonly repository: Repository<ConsumedMessage>,
  ) {}

  parseMessage(message: KafkaMessage) {
    const messageId = message.headers && message.headers.id;
    const eventType = message.headers && message.headers.eventType;
    if (messageId === undefined) {
      throw Error('MessageId was undefined. Can not process message');
    }

    if (eventType === undefined) {
      throw Error('EventType was undefined. Can not process message');
    }

    return { messageId, eventType };
  }

  async create(id: string) {
    const consumedMessage = new ConsumedMessage(id, Date.now());
    return this.repository.save(consumedMessage);
  }

  async hasBeenConsumed(id: string): Promise<boolean> {
    return (await this.repository.findOne(id)) !== undefined;
  }
}
