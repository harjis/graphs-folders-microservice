import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class CreateUniqueIndexFolderName1593331063737
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createUniqueConstraint(
      'folders',
      new TableUnique({
        name: 'folders_name_unique_index',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropUniqueConstraint(
      'folders',
      'folders_name_unique_index',
    );
  }
}
