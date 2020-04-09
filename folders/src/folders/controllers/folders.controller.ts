import { Controller, Get, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { FoldersService } from '../services/folders.service';
import { Folder } from '../entities/folder.entity';
import { EntityNotFoundException } from '../exceptions/entityNotFound.exception';

@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Get()
  all(): Promise<Folder[]> {
    return this.foldersService.all();
  }

  @UseFilters(new EntityNotFoundException())
  @MessagePattern({ cmd: 'getFolder' })
  get(folderId: number): Promise<Folder> {
    return this.foldersService.get(folderId);
  }
}
