import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';

import envs from '../envs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { Folder } from './entities/folder.entity';
import { FoldersController } from './controllers/folders.controller';
import { FoldersService } from './services/folders.service';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Folder]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            ssl: false,
            clientId: 'folders',
            brokers: [envs.kafkaHost],
          },
        },
      },
    ]),
  ],
  controllers: [FoldersController],
  providers: [
    FoldersService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class FoldersModule {}
