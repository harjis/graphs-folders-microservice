import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Folder } from '../entities/folder.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    @Inject('NATS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  all(): Promise<Folder[]> {
    return this.folderRepository.find();
  }

  async create(folder: Folder) {
    const savedFolder = await this.folderRepository.save(folder);
    this.client.emit('folder-created', savedFolder);
    return savedFolder;
  }
}
