import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDateColumnsToGraph1589530932757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
ALTER TABLE graphs ADD COLUMN "createdAt" timestamp without time zone DEFAULT now() NOT NULL;
ALTER TABLE graphs ADD COLUMN "updatedAt" timestamp without time zone DEFAULT now() NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
