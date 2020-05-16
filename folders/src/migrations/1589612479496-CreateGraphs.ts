import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export class CreateGraphs1589612479496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 't_graphs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      't_graphs',
      new TableColumn({
        name: 'folderId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      't_graphs',
      new TableForeignKey({
        columnNames: ['folderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'folders',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
