import { IEvent } from '@nestjs/cqrs';

import { Folder } from '../../entities/folder.entity';

export class FolderCreatedEvent implements IEvent {
  constructor(public readonly folder: Folder) {}
}
