import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleColumn1578699064600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN role CHARACTER VARYING NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN role`);
    }

}
