import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import envs from './envs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        ssl: false,
        brokers: [envs.kafkaHost],
      },
      consumer: {
        groupId: 'graphs-service',
      },
    },
  });
  await app.startAllMicroservicesAsync();
  app.useGlobalPipes(new ValidationPipe());
  app.listen(envs.graphServiceWebPort, () => {
    console.log(
      `Graphs web-server is listening on: ${envs.graphServiceWebPort}`,
    );
  });
}
bootstrap();
