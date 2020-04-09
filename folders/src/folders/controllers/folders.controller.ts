import { Controller, Get } from "@nestjs/common";
import { FoldersService } from "../services/folders.service";
import { Folder } from "../entities/folder.entity";

@Controller("folders")
export class FoldersController {
  constructor(private foldersService: FoldersService) {
  }

  @Get()
  async all(): Promise<Folder[]> {
    return this.foldersService.all();
  }
}
