import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { CreateFolderCommand } from '../commands/impl/create-folder.command';
import { Folder } from '../entities/folder.entity';
import { GetFoldersQuery } from '../queries/impl/get-folders.query';

@Injectable()
export class FoldersService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  all(): Promise<Folder[]> {
    return this.queryBus.execute(new GetFoldersQuery());
  }

  async create(folder: Folder) {
    return this.commandBus.execute(new CreateFolderCommand(folder));
  }
}
