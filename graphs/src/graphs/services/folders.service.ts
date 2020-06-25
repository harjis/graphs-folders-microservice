import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KafkaMessage } from 'kafkajs';

import { Folder } from '../entities/folder.entity';
import { MessageLogService } from '../../message-log/services/message-log.service';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly repository: Repository<Folder>,
    private readonly messageLogService: MessageLogService,
  ) {}

  async processFolderEvent(message: KafkaMessage) {
    const messageId = message.headers && message.headers.id;
    const eventType = message.headers && message.headers.eventType;
    if (messageId === undefined) {
      throw Error('MessageId was undefined. Can not process message');
    }

    if (eventType === undefined) {
      throw Error('EventType was undefined. Can not process message');
    }
    const hasBeenConsumed = await this.messageLogService.hasBeenConsumed(
      messageId.toString(),
    );
    if (hasBeenConsumed) {
      console.log(
        `Message with id ${messageId}has already been consumed. Skipping`,
      );
    }

    if (eventType === 'FolderCreated') {
      this.create(message.value);
    }
  }

  private create(folderValue: Buffer) {
    console.log('CREATING FOLDER', folderValue);
    // const id = folderValue.id;
    // const folder = new Folder(id)
    // return this.repositry.save(graph);
  }
}
