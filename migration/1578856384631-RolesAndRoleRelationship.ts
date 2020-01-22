import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolesAndRoleRelationship1578856384631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await Promise.all([
          queryRunner.query(`
            CREATE TABLE "role"
            (
                id SERIAL NOT NULL,
                role CHARACTER VARYING COLLATE pg_catalog."default" NOT NULL,
                CONSTRAINT "PK_role_id" PRIMARY KEY (id),
                CONSTRAINT "UQ_role" UNIQUE ("role")
            )
        `),
          queryRunner.query(`INSERT INTO role (role) VALUES ('ADMIN'),('MODERATOR'),('USER'),('GUEST')`),
          queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS role`),
          queryRunner.query(`ALTER TABLE "user" ADD roleId SMALLINT NOT NULL DEFAULT 3`),
          queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_user_role_id" FOREIGN KEY (roleId) REFERENCES role(id)`)
        ]);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE role CASCADE`);
    }

}
