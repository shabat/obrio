import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728238803950 implements MigrationInterface {
  name = 'Migration1728238803950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "offer" (name, price) VALUES
            ('Basic Plan', 9.99),
            ('Standard Plan', 19.99),
            ('Premium Plan', 29.99),
            ('Business Plan', 49.99),
            ('Enterprise Plan', 99.99);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "offer" WHERE name IN ('Basic Plan', 'Standard Plan', 'Premium Plan', 'Business Plan', 'Enterprise Plan');
        `);
  }
}
