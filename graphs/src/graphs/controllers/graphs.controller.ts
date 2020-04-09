import { Body, Controller, Get, Post } from '@nestjs/common';

import { GraphService } from '../services/graph.service';
import { Graph } from '../entities/graph.entity';

@Controller('graphs')
export class GraphsController {
  constructor(private graphService: GraphService) {}

  @Get()
  async all(): Promise<Graph[]> {
    return this.graphService.all();
  }

  @Post()
  async create(@Body() graph: Graph) {
    return this.graphService.create(graph);
  }
}
