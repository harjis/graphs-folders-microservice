import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
        transport: Transport.NATS,
        options: { url: `nats://${envs.natsHost}:${envs.natsPort}` },
      },
    ]),
  ],
  controllers: [GraphsController],
  providers: [GraphService],
})
export class GraphsModule {}
