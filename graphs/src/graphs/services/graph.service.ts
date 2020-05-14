import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Graph } from '../entities/graph.entity';

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(Graph)
    private readonly graphRepository: Repository<Graph>,
  ) {}

  async all(): Promise<Graph[]> {
    return this.graphRepository.find();
  }

  create(graph: Graph) {
    return this.graphRepository.save(graph);
  }
}
