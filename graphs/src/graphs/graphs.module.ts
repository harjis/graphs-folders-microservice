import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Graph } from './entities/graph.entity';
import { GraphsController } from './controllers/graphs.controller';
import { GraphService } from './services/graph.service';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Graph]),
    ClientsModule.register([
      { name: 'FOLDERS_SERVICE', options: { host: 'localhost', port: 3100 } },
    ]),
  ],
  controllers: [GraphsController],
  providers: [GraphService],
})
export class GraphsModule {}
