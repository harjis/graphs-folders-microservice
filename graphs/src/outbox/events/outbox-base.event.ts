import { Outbox } from "../entities/outbox.entity";

export interface OutboxBaseEvent<Payload> {
  toOutbox: () => Outbox<Payload>
}
