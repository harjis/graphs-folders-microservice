import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class GraphsFoldersCreate1589526229984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'graphs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('graphs');
  }
}
