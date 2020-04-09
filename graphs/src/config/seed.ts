import { ConnectionOptions, createConnection } from 'typeorm';
import { Graph } from '../graphs/entities/graph.entity';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'graphs-folders-microservice/graphs',
  entities: ['./**/*.entity.ts'],
  synchronize: true,
};

createConnection(config).then(async connection => {
  const graph = new Graph();
  graph.name = 'Graph 1';
  graph.folderId = 1;
  await connection.getRepository(Graph).save(graph);
});
