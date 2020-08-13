import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('outbox')
export class Outbox<Payload> {
  constructor(
    id: string,
    aggregatetype: string,
    aggregateid: string,
    type: string,
    payload: Payload,
  ) {
    this.id = id;
    this.aggregatetype = aggregatetype;
    this.aggregateid = aggregateid;
    this.type = type;
    this.payload = payload;
  }
  @PrimaryColumn()
  id: string;

  @Column()
  aggregatetype: string;

  @Column()
  aggregateid: string;

  @Column()
  type: string;

  @Column({
    type: 'jsonb',
  })
  payload: Payload;
}
