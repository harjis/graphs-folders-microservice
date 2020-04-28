import { NestFactory } from '@nestjs/core';

import envs from './envs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(envs.folderServiceWebPort, () => {
    console.log(
      `Folders web-server is listening on: ${envs.folderServiceWebPort}`,
    );
  });
}
bootstrap();
