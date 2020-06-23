import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOutbox1592902285520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'outbox',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: false },
          { name: 'aggregatetype', type: 'varchar' },
          { name: 'aggregateid', type: 'varchar' },
          { name: 'type', type: 'varchar' },
          { name: 'payload', type: 'jsonb' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('outbox');
  }
}
