import { Injectable } from '@nestjs/common';
import { OutboxBaseEvent } from '../events/outbox-base.event';
import { QueryRunner } from 'typeorm';
import { Outbox } from "../entities/outbox.entity";

@Injectable()
export class OutboxService<Payload> {
  constructor() {}

  async fireEvent(
    event: OutboxBaseEvent<Payload>,
    queryRunner: QueryRunner,
  ): Promise<Outbox<Payload>> {
    const outbox = await queryRunner.manager.save(event.toOutbox());
    return queryRunner.manager.remove(outbox);
  }
}
