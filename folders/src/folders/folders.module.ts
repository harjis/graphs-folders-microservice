import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Folder } from './entities/folder.entity';
import { FoldersController } from './controllers/folders.controller';
import { FoldersService } from './services/folders.service';
import { OutboxService } from '../outbox/services/outbox.service';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  controllers: [FoldersController],
  providers: [FoldersService, OutboxService],
})
export class FoldersModule {}
