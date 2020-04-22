import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { GraphService } from '../services/graph.service';
import { Graph } from '../entities/graph.entity';
import { Folder } from '../entities/folder.entity';
import { FolderService } from '../services/folder.service';
import { NotFoundInterceptor } from '../interceptors/notFound.interceptor';

@Controller('graphs')
export class GraphsController {
  constructor(
    private graphService: GraphService,
    private folderService: FolderService,
  ) {}

  @Get()
  async all(): Promise<Graph[]> {
    return this.graphService.all();
  }

  @Post()
  @UseInterceptors(NotFoundInterceptor)
  async create(@Body() graph: Graph) {
    return this.graphService.create(graph);
  }

  @EventPattern('folder-created')
  folderCreatedEventHandler(@Payload() folder: Folder) {
    return this.folderService.create(folder);
  }
}
