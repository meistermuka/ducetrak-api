import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordColumn1578500676460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN password CHARACTER VARYING NOT NULL DEFAULT 'changeme'`);
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN role CHARACTER VARYING NOT NULL DEFAUL 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN password`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN role`);
    }

}
