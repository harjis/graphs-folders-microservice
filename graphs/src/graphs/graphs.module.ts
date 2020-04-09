import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';

import envs from '../envs';
import { Graph } from './entities/graph.entity';
import { GraphsController } from './controllers/graphs.controller';
import { GraphService } from './services/graph.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Graph]),
    ClientsModule.register([
      {
        name: 'FOLDERS_SERVICE',
        options: { host: envs.folderServiceHost, port: envs.folderServicePort },
      },
    ]),
  ],
  controllers: [GraphsController],
  providers: [GraphService],
})
export class GraphsModule {}
