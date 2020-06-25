import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Folder } from './folder.entity';

@Entity('graphs')
export class Graph {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'int', nullable: false })
  folderId!: number;
  @ManyToOne(
    type => Folder,
    folder => folder.graphs,
  )
  @JoinColumn({ name: 'folderId' })
  folder!: Folder;
}
