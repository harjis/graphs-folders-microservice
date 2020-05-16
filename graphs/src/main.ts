import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import envs from './envs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.listen(envs.graphServiceWebPort, () => {
    console.log(
      `Graphs web-server is listening on: ${envs.graphServiceWebPort}`,
    );
  });
}
bootstrap();
