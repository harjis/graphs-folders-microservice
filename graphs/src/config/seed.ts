import { ConnectionOptions, createConnection } from 'typeorm';
import { Graph } from '../graphs/entities/graph.entity';

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
  graph.folderId = 1;
  await connection.getRepository(Graph).save(graph);
});
