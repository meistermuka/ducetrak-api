import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleTableUpdate1580696613006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await Promise.all([
        queryRunner.query(`ALTER TABLE role ADD "createdDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()`),
        queryRunner.query(`ALTER TABLE role ADD "updatedDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()`),
      ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await Promise.all([
        queryRunner.query(`ALTER TABLE role DROP COLUMN IF EXISTS "createdDate"`),
        queryRunner.query(`ALTER TABLE role DROP COLUMN IF EXISTS "updatedDate"`),
      ]);
    }

}
