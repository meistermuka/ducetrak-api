import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertedTypes1577402123444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`INSERT INTO type (name) VALUES ('fruit')`);
        await queryRunner.query(`INSERT INTO type (name) VALUES ('vegetable')`);
        await queryRunner.query(`INSERT INTO type (name) VALUES ('grain')`);
        await queryRunner.query(`INSERT INTO type (name) VALUES ('bean')`);
        await queryRunner.query(`INSERT INTO type (name) VALUES ('nut')`);
        await queryRunner.query(`INSERT INTO type (name) VALUES ('seed')`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM type WHERE name IN ('fruit', 'vegetable', 'grain', 'bean', 'nut', 'seed')`);
    }

}
