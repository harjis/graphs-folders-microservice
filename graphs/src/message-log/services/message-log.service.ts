import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumedMessage } from '../entities/consumed-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageLogService {
  constructor(
    @InjectRepository(ConsumedMessage)
    private readonly repository: Repository<ConsumedMessage>,
  ) {}

  async create(id: string) {
    const consumedMessage = new ConsumedMessage(id, Date.now());
    return this.repository.save(consumedMessage);
  }

  async hasBeenConsumed(id: string): Promise<boolean> {
    return (await this.repository.findOne(id)) !== undefined;
  }
}
