import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import envs from '../envs';
import { Graph } from './entities/graph.entity';
import { GraphsController } from './controllers/graphs.controller';
import { GraphService } from './services/graph.service';
import { FolderService } from './services/folder.service';
import { Folder } from './entities/folder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Graph]),
    TypeOrmModule.forFeature([Folder]),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: { url: `nats://${envs.natsHost}:${envs.natsPort}` },
      },
    ]),
  ],
  controllers: [GraphsController],
  providers: [GraphService, FolderService],
})
export class GraphsModule {}
