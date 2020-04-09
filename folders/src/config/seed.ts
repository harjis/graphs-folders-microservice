import { ConnectionOptions, createConnection } from 'typeorm';
import { Folder } from '../folders/entities/folder.entity';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'graphs-folders-microservice/folders',
  entities: ['./**/*.entity.ts'],
  synchronize: true,
};

createConnection(config).then(async connection => {
  const folder = new Folder();
  folder.name = 'Folder 1';
  await connection.getRepository(Folder).save(folder);
});
