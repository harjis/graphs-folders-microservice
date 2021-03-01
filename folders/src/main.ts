import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import envs from './envs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      queue: 'folders',
      url: `nats://${envs.natsHost}:${envs.natsPort}`,
    },
  });
  await app.startAllMicroservicesAsync();
  app.listen(envs.folderServiceWebPort, () => {
    console.log(
      `Folders web-server is listening on: ${envs.folderServiceWebPort}`,
    );
  });
}
bootstrap();
