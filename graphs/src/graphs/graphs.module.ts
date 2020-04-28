import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Graph } from './entities/graph.entity';
import { GraphsController } from './controllers/graphs.controller';
import { GraphService } from './services/graph.service';
import { FolderService } from './services/folder.service';
import { Folder } from './entities/folder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Graph]),
    TypeOrmModule.forFeature([Folder]),
  ],
  controllers: [GraphsController],
  providers: [GraphService, FolderService],
})
export class GraphsModule {}
