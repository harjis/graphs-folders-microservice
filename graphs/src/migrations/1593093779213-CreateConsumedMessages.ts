import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConsumedMessages1593093779213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'consumed-messages',
        columns: [
          {
            name: 'id',
            type: 'string',
            isPrimary: true,
            isGenerated: false,
          },
          { name: 'timeOfReceiving', type: 'bigint', isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('consumed-messages');
  }
}
