import { Connection, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Folder } from '../entities/folder.entity';

@Injectable()
export class FoldersService {
  constructor(private readonly connection: Connection) {}

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
      return await queryRunner.manager.save(this.toFolder(folder));
    };
    return this.withTransaction(createCallback);
  }

  async update(folder: Folder) {
    const updateCallBack = async (queryRunner: QueryRunner) => {
      return await queryRunner.manager.save(this.toFolder(folder));
    };
    return this.withTransaction(updateCallBack);
  }

  async delete(folderId: number) {
    const folderRepository = this.connection.getRepository(Folder);
    return folderRepository.delete(folderId);
  }

  private async withTransaction(
    callback: (queryRunner: QueryRunner) => Promise<Folder>,
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
