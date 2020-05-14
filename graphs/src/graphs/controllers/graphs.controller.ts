import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';

import { Graph } from '../entities/graph.entity';
import { GraphService } from '../services/graph.service';
import { NotFoundInterceptor } from '../interceptors/notFound.interceptor';

@Controller('graphs')
export class GraphsController {
  constructor(private graphService: GraphService) {}

  @Get()
  async all(): Promise<Graph[]> {
    return this.graphService.all();
  }

  @Post()
  @UseInterceptors(NotFoundInterceptor)
  async create(@Body() graph: Graph) {
    return this.graphService.create(graph);
  }
}
