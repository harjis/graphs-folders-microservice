import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Folder } from "../entities/folder.entity";
import { Repository } from "typeorm";

@Injectable()
export class FoldersService {
  constructor(@InjectRepository(Folder) private readonly folderRepository: Repository<Folder>) {
  }

  async all(): Promise<Folder[]>{
    return this.folderRepository.find();
  }
}
