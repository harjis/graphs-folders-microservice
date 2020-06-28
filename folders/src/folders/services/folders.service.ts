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
    return this.executeInTransaction(async (queryRunner: QueryRunner) => {
      const savedFolder = await queryRunner.manager.save(this.toFolder(folder));
      await this.outboxService.fireEvent(
        new FolderCreatedEvent(savedFolder),
        queryRunner,
      );
      return savedFolder;
    });
  }

  async update(folder: Folder) {
    return this.executeInTransaction(async (queryRunner: QueryRunner) => {
      await queryRunner.manager.save(this.toFolder(folder));
      const updatedFolder = await this.get(folder.id);
      await this.outboxService.fireEvent(
        new FolderUpdatedEvent(updatedFolder),
        queryRunner,
      );
      return updatedFolder;
    });
  }

  async delete(folderId: number) {
    return this.executeInTransaction(async (queryRunner: QueryRunner) => {
      const folder = await this.get(folderId);
      const result = await queryRunner.manager.remove(folder);
      await this.outboxService.fireEvent(
        // the spread is needed because remove mutates folder and removes id
        new FolderDeletedEvent({ ...folder, id: folderId }),
        queryRunner,
      );
      return result;
    });
  }

  async fail() {
    return this.executeInTransaction(async (queryRunner: QueryRunner) => {
      const folder1 = new Folder();
      folder1.name = 'Should not be sent because name not unique';
      const savedFolder1 = await queryRunner.manager.save(folder1);
      await this.outboxService.fireEvent(
        new FolderCreatedEvent(savedFolder1),
        queryRunner,
      );

      const folder2 = new Folder();
      folder1.name = 'Should not be sent because name not unique';
      const savedFolder2 = await queryRunner.manager.save(folder2);

      await this.outboxService.fireEvent(
        new FolderCreatedEvent(savedFolder2),
        queryRunner,
      );
    });
  }

  private async executeInTransaction<ReturnType>(
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
