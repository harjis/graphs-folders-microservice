import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoldersModule } from './folders/folders.module';
import { OutboxModule } from './outbox/outbox.module';

@Module({
  imports: [TypeOrmModule.forRoot(), FoldersModule, OutboxModule],
})
export class AppModule {}
