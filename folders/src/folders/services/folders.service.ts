import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Folder } from '../entities/folder.entity';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  all(): Promise<Folder[]> {
    return this.folderRepository.find();
  }

  get(folderId: number): Promise<Folder> {
    return this.folderRepository.findOneOrFail(folderId);
  }

  upsert(folder: Folder) {
    return this.folderRepository.save(folder);
  }

  async delete(folderId: number) {
    return this.folderRepository.delete(folderId);
  }
}
