import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('consumed-messages')
export class ConsumedMessage {
  constructor(id: string, timeOfReceiving: number) {
    this.id = id;
    this.timeOfReceiving = timeOfReceiving;
  }
  @PrimaryColumn()
  id: string;

  @Column()
  timeOfReceiving: number;
}
