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
    const { messageId, eventType } = this.messageLogService.parseMessage(
      message,
    );
    const hasBeenConsumed = await this.messageLogService.hasBeenConsumed(
      messageId.toString(),
    );
    if (hasBeenConsumed) {
      console.log(
        `Message with id ${messageId}has already been consumed. Skipping`,
      );
      return;
    }

    if (eventType === 'FolderCreated') {
      this.create(message.value);
    } else if (eventType === 'FolderUpdated') {
      this.update(message.value);
    } else if (eventType === 'FolderDeleted') {
      this.delete(message.value);
    }

    await this.messageLogService.create(messageId.toString());
  }

  private create(folderObject: Record<string, any>) {
    const folder = this.toFolder(folderObject);
    return this.repository.save(folder);
  }

  private update(folderObject: Record<string, any>) {
    const folder = this.toFolder(folderObject);
    return this.repository.save(folder);
  }

  private delete(folderObject: Record<string, any>) {
    const folder = this.toFolder(folderObject);
    return this.repository.remove(folder);
  }

  private toFolder(folderObject: Record<string, any>): Folder {
    const folderJson = JSON.parse(folderObject.payload);
    const folder = new Folder(
      folderJson.id,
      folderJson.name,
      folderJson.createdAt,
      folderJson.updatedAt,
    );
    return folder;
  }
}
