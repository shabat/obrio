import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728245062802 implements MigrationInterface {
  name = 'Migration1728245062802';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD "astrologyReportTime" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD "astrologyReportSent" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP COLUMN "astrologyReportSent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP COLUMN "astrologyReportTime"`,
    );
  }
}
