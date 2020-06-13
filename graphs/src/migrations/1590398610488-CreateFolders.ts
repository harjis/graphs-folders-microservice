import {
  MigrationInterface,
  QueryRunner,
  Table, TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateFolders1590398610488 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'folders',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: false
          },
          { name: 'name', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'bigint',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'graphs',
      new TableColumn({
        name: 'folderId',
        type: 'bigint',
      }),
    );

    await queryRunner.createForeignKey(
      'graphs',
      new TableForeignKey({
        name: 'graphs-folderId-fk',
        columnNames: ['folderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'folders',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('graphs', 'graphs-folderId-fk');
    await queryRunner.dropTable('folders');
  }
}
