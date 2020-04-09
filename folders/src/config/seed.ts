import { ConnectionOptions, createConnection } from 'typeorm';
import { Folder } from '../folders/entities/folder.entity';

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
  const folder = new Folder();
  folder.name = 'Folder 1';
  await connection.getRepository(Folder).save(folder);
});
