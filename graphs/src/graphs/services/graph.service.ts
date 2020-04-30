import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Graph } from '../entities/graph.entity';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessageType } from '../types/kafka-message.type';

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(Graph)
    private readonly graphRepository: Repository<Graph>,
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async all(): Promise<Graph[]> {
    return this.graphRepository.find();
  }

  async create(graph: Graph) {
    const savedGraph = await this.graphRepository.save(graph);
    const event: KafkaMessageType<Graph> = {
      type: 'UPSERT',
      payload: savedGraph,
    };
    this.client.emit('graphs-topic', event);
    return savedGraph;
  }
}
