import {MigrationInterface, QueryRunner} from "typeorm";

export class LocationTableUpgrades1580217580305 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await Promise.all([
        queryRunner.query(`ALTER TABLE location ADD createdDate TIMESTAMP WITHOUT TIME ZONE NOT NULL`),
        queryRunner.query(`ALTER TABLE location ADD updatedDate TIMESTAMP WITHOUT TIME ZONE NOT NULL`),
        queryRunner.query(`ALTER TABLE price ADD updatedDate TIMESTAMP WITHOUT TIME ZONE NOT NULL`),
        queryRunner.query(`ALTER TABLE produce RENAME "modifiedDate" TO "updatedDate"`),
      ])
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await Promise.all([
        queryRunner.query(`ALTER TABLE location DROP COLUMN IF EXISTS createdDate`),
        queryRunner.query(`ALTER TABLE location DROP COLUMN IF EXISTS updatedDate`),
        queryRunner.query(`ALTER TABLE price DROP COLUMN IF EXISTS updatedDate`),
        queryRunner.query(`ALTER TABLE produce RENAME "updatedDate" TO "modifiedDate"`),
      ])
    }

}
