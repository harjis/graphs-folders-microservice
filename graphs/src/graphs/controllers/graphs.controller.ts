import { Controller, Get } from '@nestjs/common';

import { GraphService } from '../services/graph.service';
import { Graph } from '../entities/graph.entity';

@Controller('graphs')
export class GraphsController {
  constructor(private graphService: GraphService) {}

  @Get()
  async all(): Promise<Graph[]> {
    return this.graphService.all();
  }
}
