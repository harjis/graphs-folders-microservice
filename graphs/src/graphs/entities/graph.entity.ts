import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('graphs')
export class Graph {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  folderId!: number;
}
