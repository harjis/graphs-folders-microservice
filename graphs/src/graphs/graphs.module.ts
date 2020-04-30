import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import envs from "../envs";
import { Folder } from './entities/folder.entity';
import { FolderService } from './services/folder.service';
import { Graph } from './entities/graph.entity';
import { GraphsController } from './controllers/graphs.controller';
import { GraphService } from './services/graph.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Graph]),
    TypeOrmModule.forFeature([Folder]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            ssl: false,
            brokers: [envs.kafkaHost],
          },
          consumer: {
            groupId: 'graphs-service'
          }
        },
      },
    ]),
  ],
  controllers: [GraphsController],
  providers: [GraphService, FolderService],
})
export class GraphsModule {}
