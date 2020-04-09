import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import envs from './envs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: envs.folderServiceHost, port: envs.folderServicePort },
  });
  await app.startAllMicroservicesAsync();
  app.listen(envs.folderServiceWebPort, () => {
    console.log(
      `Folders microservice is listening on: ${envs.folderServiceHost}:${envs.folderServicePort}`,
    );
    console.log(
      `Folders web-server is listening on: ${envs.folderServiceWebPort}`,
    );
  });
}
bootstrap();
