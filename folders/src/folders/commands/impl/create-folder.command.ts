import { ICommand } from '@nestjs/cqrs';

import { Folder } from '../../entities/folder.entity';

export class CreateFolderCommand implements ICommand {
  constructor(public readonly folder: Folder) {}
}
