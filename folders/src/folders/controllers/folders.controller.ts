import { Body, Controller, Get, Post } from '@nestjs/common';

import { FoldersService } from '../services/folders.service';
import { Folder } from '../entities/folder.entity';

@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Get()
  all(): Promise<Folder[]> {
    return this.foldersService.all();
  }

  @Post()
  create(@Body() folder: Folder) {
    return this.foldersService.create(folder);
  }
}
