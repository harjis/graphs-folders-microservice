import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFoldersQuery } from '../impl/get-folders.query';
import { Folder } from '../../entities/folder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetFoldersQuery)
export class GetFoldersHandler
  implements IQueryHandler<GetFoldersQuery, Folder[]> {
  constructor(
    @InjectRepository(Folder) private readonly repository: Repository<Folder>,
  ) {}

  async execute(query: GetFoldersQuery) {
    return this.repository.find();
  }
}
