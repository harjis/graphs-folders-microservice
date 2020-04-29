import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFolderCommand } from '../impl/create-folder.command';
import { Folder } from '../../entities/folder.entity';
import { FolderModel } from '../../models/folder.model';

@CommandHandler(CreateFolderCommand)
export class CreateFolderHandler
  implements ICommandHandler<CreateFolderCommand> {
  constructor(
    @InjectRepository(Folder) private readonly repository: Repository<Folder>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateFolderCommand): Promise<Folder> {
    const savedFolder = await this.repository.save(command.folder);
    const folderModel = this.publisher.mergeObjectContext(
      this.createFolderModel(savedFolder),
    );
    folderModel.folderCreated();
    folderModel.commit();

    return Promise.resolve(savedFolder);
  }

  private createFolderModel(savedFolder: Folder) {
    return new FolderModel(savedFolder);
  }
}
