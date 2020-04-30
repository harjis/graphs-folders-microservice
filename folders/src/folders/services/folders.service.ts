import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Folder } from '../entities/folder.entity';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessageType } from '../types/kafka-message.type';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  all(): Promise<Folder[]> {
    return this.folderRepository.find();
  }

  get(folderId: number): Promise<Folder> {
    return this.folderRepository.findOneOrFail(folderId);
  }

  async upsert(folder: Folder) {
    const savedFolder = await this.folderRepository.save(folder);
    const event: KafkaMessageType<Folder> = {
      type: 'UPSERT',
      payload: savedFolder,
    };
    this.client.emit('folders-topic', event);
    return savedFolder;
  }

  async delete(folderId: number) {
    const folder = await this.get(folderId);
    // I suppose this is part of the OOP pain. If you do this.folderRepository.remove(folder);
    // here the app works incorrectly. This is because remove mutates folder instance and sets id undefined
    await this.folderRepository.delete(folderId);
    const event: KafkaMessageType<Folder> = { type: 'DELETE', payload: folder };
    this.client.emit('folders-topic', event);
  }
}
