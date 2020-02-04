import {MigrationInterface, QueryRunner} from "typeorm";

export class UserModifiedDateColumn1580065271717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`ALTER TABLE "user" ADD "updatedDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "updatedDate"`);
    }

}
