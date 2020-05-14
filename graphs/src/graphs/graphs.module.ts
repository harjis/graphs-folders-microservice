import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Folder } from './entities/folder.entity';
import { Graph } from './entities/graph.entity';
import { GraphsController } from './controllers/graphs.controller';
import { GraphService } from './services/graph.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Graph]),
    TypeOrmModule.forFeature([Folder]),
  ],
  controllers: [GraphsController],
  providers: [GraphService],
})
export class GraphsModule {}
