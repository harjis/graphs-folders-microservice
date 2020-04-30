import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Folder } from '../entities/folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  upsert(folder: Folder) {
    return this.folderRepository.save(folder);
  }

  delete(folder: Folder) {
    return this.folderRepository.remove(folder);
  }
}
