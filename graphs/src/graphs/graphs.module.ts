import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Graph } from './entities/graph.entity';
import { GraphsController } from './controllers/graphs.controller';
import { GraphService } from './services/graph.service';

@Module({
  imports: [TypeOrmModule.forFeature([Graph])],
  controllers: [GraphsController],
  providers: [GraphService],
})
export class GraphsModule {}
