import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOutbox1592902285520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'outbox',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            isUnique: true,
            isNullable: false,
          },
          { name: 'aggregatetype', type: 'varchar', isNullable: false },
          { name: 'aggregateid', type: 'varchar', isNullable: false },
          { name: 'type', type: 'varchar', isNullable: false },
          { name: 'payload', type: 'jsonb', isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('outbox');
  }
}
