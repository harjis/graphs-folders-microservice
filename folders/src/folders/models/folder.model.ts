import { AggregateRoot } from '@nestjs/cqrs';
import { Folder } from '../entities/folder.entity';
import { FolderCreatedEvent } from '../events/impl/folder-created.event';

export class FolderModel extends AggregateRoot {
  constructor(private readonly folder: Folder) {
    super();
  }

  folderCreated() {
    this.apply(new FolderCreatedEvent(this.folder));
  }
}
