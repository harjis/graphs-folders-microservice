import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import envs from './envs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: envs.graphServiceHost, port: envs.graphServicePort },
  });
  await app.startAllMicroservicesAsync();
  app.listen(envs.graphServiceWebPort, () =>
    console.log('Web-server is listening'),
  );
}
bootstrap();
