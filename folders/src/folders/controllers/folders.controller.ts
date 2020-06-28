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

  @Get('/fail')
  fail(): Promise<void> {
    return this.foldersService.fail();
  }

  @Post()
  create(@Body() folder: Folder): Promise<Folder> {
    return this.foldersService.create(folder);
  }

  @Put()
  update(@Body() folder: Folder): Promise<Folder> {
    return this.foldersService.update(folder);
  }

  @Delete(':folderId')
  delete(@Param('folderId', new ParseIntPipe()) folderId: number) {
    return this.foldersService.delete(folderId);
  }
}
