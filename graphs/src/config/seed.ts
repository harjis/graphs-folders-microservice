import { ConnectionOptions, createConnection } from 'typeorm';

import { Graph } from '../graphs/entities/graph.entity';
import { Folder } from '../graphs/entities/folder.entity';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['./**/*.entity.ts'],
  synchronize: true,
};

createConnection(config).then(async connection => {
  const graph = new Graph();
  graph.name = 'Graph 1';
  // TODO This should not be done. Is this forbidden or do I just fetch them here?
  const folder = new Folder();
  folder.name = 'Folder 1';
  graph.folder = folder;
  const savedGraph = await connection.getRepository(Graph).save(graph);
  console.log('Saved graph: ', savedGraph);
});
