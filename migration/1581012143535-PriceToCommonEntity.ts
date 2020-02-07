import {MigrationInterface, QueryRunner} from "typeorm";

export class PriceToCommonEntity1581012143535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await Promise.all([
        queryRunner.query(`ALTER TABLE "price" DROP COLUMN IF EXISTS active`),
        queryRunner.query(`ALTER TABLE "price" ADD deleted BOOLEAN NOT NULL DEFAULT FALSE`),
        queryRunner.query(`ALTER TABLE "type" ADD deleted BOOLEAN NOT NULL DEFAULT FALSE`),
        queryRunner.query(`ALTER TABLE "type" ADD "createdDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()`),
        queryRunner.query(`ALTER TABLE "type" ADD "updatedDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()`),
      ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await Promise.all([
        queryRunner.query(`ALTER TABLE "price" ADD active BOOLEAN NOT NULL DEFAULT FALSE`),
        queryRunner.query(`ALTER TABLE "price" DROP COLUMN IF EXISTS deleted`),
        queryRunner.query(`ALTER TABLE "type" DROP COLUMN IF EXISTS deleted`),
        queryRunner.query(`ALTER TABLE "type" DROP COLUMN IF EXISTS "createdDate"`),
        queryRunner.query(`ALTER TABLE "type" DROP COLUMN IF EXISTS "updatedDate"`),
      ]);
    }
}
