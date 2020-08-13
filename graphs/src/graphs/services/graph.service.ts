import { Injectable } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

import { Graph } from '../entities/graph.entity';
import { OutboxService } from '../../outbox/services/outbox.service';
import { GraphCreatedEvent } from '../events/graph-created-event';

@Injectable()
export class GraphService {
  constructor(
    private readonly connection: Connection,
    private readonly outboxService: OutboxService<Graph>,
  ) {}

  async all(): Promise<Graph[]> {
    const repository = this.connection.getRepository(Graph);
    return repository.find();
  }

  async create(graph: Graph) {
    return this.executeInTransaction(async queryRunner => {
      const savedGraph = await queryRunner.manager.save(this.toGraph(graph));
      await this.outboxService.fireEvent(
        new GraphCreatedEvent(savedGraph),
        queryRunner,
      );

      return savedGraph;
    });
  }

  private async executeInTransaction<ReturnType>(
    callback: (queryRunner: QueryRunner) => Promise<ReturnType>,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await callback(queryRunner);

      await queryRunner.commitTransaction();

      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  private toGraph(graphObject: Graph): Graph {
    const graph = new Graph();
    graph.id = graphObject.id;
    graph.name = graphObject.name;
    graph.folderId = graphObject.folderId;

    return graph;
  }
}
