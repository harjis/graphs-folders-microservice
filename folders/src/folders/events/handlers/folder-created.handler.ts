import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FolderCreatedEvent } from '../impl/folder-created.event';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@EventsHandler(FolderCreatedEvent)
export class FolderCreatedHandler implements IEventHandler<FolderCreatedEvent> {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}
  handle(event: FolderCreatedEvent): any {
    this.client.emit('folders-topic', event.folder);
  }
}
