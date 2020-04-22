import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import envs from '../envs';
import { Folder } from './entities/folder.entity';
import { FoldersController } from './controllers/folders.controller';
import { FoldersService } from './services/folders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Folder]),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: { url: `nats://${envs.natsHost}:${envs.natsPort}` },
      },
    ]),
  ],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
