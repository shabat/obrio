import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1633123456789 implements MigrationInterface {
  name = 'Migration1633123456789';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "marketingData" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "offerId" uuid NOT NULL, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_d4ce865a4918647bb81431e181c" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_d4ce865a4918647bb81431e181c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b"`,
    );
    await queryRunner.query(`DROP TABLE "purchase"`);
    await queryRunner.query(`DROP TABLE "offer"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
