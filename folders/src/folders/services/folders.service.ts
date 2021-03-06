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

  create(folder: Folder) {
    return this.folderRepository.save(folder);
  }

  get(folderId: number): Promise<Folder> {
    return this.folderRepository.findOneOrFail(folderId);
  }
}
