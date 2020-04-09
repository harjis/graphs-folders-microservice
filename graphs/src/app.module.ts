import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphsModule } from './graphs/graphs.module';

@Module({
  imports: [TypeOrmModule.forRoot(), GraphsModule],
})
export class AppModule {}
