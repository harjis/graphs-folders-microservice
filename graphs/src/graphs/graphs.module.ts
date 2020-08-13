import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConsumedMessage } from '../message-log/entities/consumed-message.entity';
import { Folder } from './entities/folder.entity';
import { FoldersController } from './controllers/folders.controller';
import { FoldersService } from './services/folders.service';
import { Graph } from './entities/graph.entity';
import { GraphsController } from './controllers/graphs.controller';
import { GraphService } from './services/graph.service';
import { MessageLogService } from '../message-log/services/message-log.service';
import { OutboxService } from '../outbox/services/outbox.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Graph]),
    TypeOrmModule.forFeature([Folder]),
    TypeOrmModule.forFeature([ConsumedMessage]),
  ],
  controllers: [GraphsController, FoldersController],
  providers: [GraphService, FoldersService, MessageLogService, OutboxService],
})
export class GraphsModule {}
