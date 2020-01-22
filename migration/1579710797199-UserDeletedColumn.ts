import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDeletedColumn1579710797199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`ALTER TABLE "user" ADD deleted BOOLEAN NOT NULL DEFAULT FALSE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS deleted`);
    }

}
