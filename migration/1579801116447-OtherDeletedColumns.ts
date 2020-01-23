import {MigrationInterface, QueryRunner} from "typeorm";

export class OtherDeletedColumns1579801116447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await Promise.all([
        queryRunner.query(`ALTER TABLE "location" ADD deleted BOOLEAN NOT NULL DEFAULT FALSE`),
        queryRunner.query(`ALTER TABLE "produce" ADD deleted BOOLEAN NOT NULL DEFAULT FALSE`),
        queryRunner.query(`ALTER TABLE "role" ADD deleted BOOLEAN NOT NULL DEFAULT FALSE`),
      ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await Promise.all([
        queryRunner.query(`ALTER TABLE "location" DROP COLUMN IF EXISTS deleted`),
        queryRunner.query(`ALTER TABLE "produce" DROP COLUMN IF EXISTS deleted`),
        queryRunner.query(`ALTER TABLE "role" DROP COLUMN IF EXISTS deleted`),
      ]);
    }

}
