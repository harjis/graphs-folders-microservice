import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Graph } from './graph.entity';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(
    type => Graph,
    graph => graph.folder,
  )
  graphs!: Graph;
}
