import { Connection, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Folder } from '../entities/folder.entity';
import { OutboxService } from '../../outbox/services/outbox.service';
import { FolderCreatedEvent } from '../events/folder-created.event';
import { FolderUpdatedEvent } from '../events/folder-updated.event';
import { FolderDeletedEvent } from '../events/folder-deleted.event';

@Injectable()
export class FoldersService {
  constructor(
    private readonly connection: Connection,
    private readonly outboxService: OutboxService<Folder>,
  ) {}

  all(): Promise<Folder[]> {
    const folderRepository = this.connection.getRepository(Folder);
    return folderRepository.find();
  }

  get(folderId: number): Promise<Folder> {
    const folderRepository = this.connection.getRepository(Folder);
    return folderRepository.findOneOrFail(folderId);
  }

  async create(folder: Folder) {
    const createCallback = async (queryRunner: QueryRunner) => {
      const savedFolder = await queryRunner.manager.save(this.toFolder(folder));
      await this.outboxService.fireEvent(
        new FolderCreatedEvent(savedFolder),
        queryRunner,
      );
      return savedFolder;
    };
    return this.withTransaction(createCallback);
  }

  async update(folder: Folder) {
    const updateCallBack = async (queryRunner: QueryRunner) => {
      await queryRunner.manager.save(this.toFolder(folder));
      const updatedFolder = await this.get(folder.id);
      await this.outboxService.fireEvent(
        new FolderUpdatedEvent(updatedFolder),
        queryRunner,
      );
      return updatedFolder;
    };
    return this.withTransaction(updateCallBack);
  }

  async delete(folderId: number) {
    const deleteCallback = async (queryRunner: QueryRunner) => {
      const folder = await this.get(folderId);
      const result = await queryRunner.manager.remove(folder);
      await this.outboxService.fireEvent(
        // the spread is needed because remove mutates folder and removes id
        new FolderDeletedEvent({ ...folder, id: folderId }),
        queryRunner,
      );
      return result;
    };
    return this.withTransaction(deleteCallback);
  }

  private async withTransaction<ReturnType>(
    callback: (queryRunner: QueryRunner) => Promise<ReturnType>,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await callback(queryRunner);

      await queryRunner.commitTransaction();

      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  private toFolder(folderObject: Folder) {
    const folder = new Folder();
    folder.id = folderObject.id;
    folder.name = folderObject.name;
    folder.createdAt = folderObject.createdAt;
    folder.updatedAt = folderObject.updatedAt;
    return folder;
  }
}
