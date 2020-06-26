import { v4 } from 'uuid';

import { OutboxBaseEvent } from '../../outbox/events/outbox-base.event';
import { Outbox } from '../../outbox/entities/outbox.entity';
import { Folder } from '../entities/folder.entity';

export class FolderDeletedEvent implements OutboxBaseEvent<Folder> {
  constructor(private readonly folder: Folder) {
    this.id = v4();
    this.aggregatetype = 'Folder';
    this.aggregateid = folder.id.toString();
    this.type = 'FolderDeleted';
    this.payload = folder;
  }

  id!: string;
  aggregatetype!: string;
  aggregateid!: string;
  type!: string;
  payload!: Folder;

  toOutbox(): Outbox<Folder> {
    return new Outbox(
      this.id,
      this.aggregatetype,
      this.aggregateid,
      this.type,
      this.payload,
    );
  }
}
