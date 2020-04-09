import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [TypeOrmModule.forRoot(), FoldersModule],
})
export class AppModule {}
