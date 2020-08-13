import { v4 } from 'uuid';

import { Graph } from "../entities/graph.entity";
import { Outbox } from '../../outbox/entities/outbox.entity';
import { OutboxBaseEvent } from '../../outbox/events/outbox-base.event';

export class GraphCreatedEvent implements OutboxBaseEvent<Graph> {
  constructor(private readonly graph: Graph) {
    this.id = v4();
    this.aggregatetype = 'Graph';
    this.aggregateid = graph.id.toString();
    this.type = 'GraphCreated';
    this.payload = graph;
  }

  id!: string;
  aggregatetype!: string;
  aggregateid!: string;
  type!: string;
  payload!: Graph;

  toOutbox(): Outbox<Graph> {
    return new Outbox(
      this.id,
      this.aggregatetype,
      this.aggregateid,
      this.type,
      this.payload,
    );
  }
}
