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

  async create(message: ConsumedMessage) {
    return this.repository.save(message);
  }

  async hasBeenConsumed(id: string): Promise<boolean> {
    return (await this.repository.findOne(id)) === undefined;
  }
}
