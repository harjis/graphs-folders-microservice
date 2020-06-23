import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put()
  update(@Body() folder: Folder) {
    return this.foldersService.update(folder);
  }

  @Delete(':folderId')
  delete(@Param('folderId', new ParseIntPipe()) folderId: number) {
    return this.foldersService.delete(folderId);
  }
}
