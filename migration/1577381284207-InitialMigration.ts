import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1577381284207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // USER TABLE
        await queryRunner.query(`
        CREATE TABLE "user"
        (
            id SERIAL NOT NULL,
            "userName" CHARACTER VARYING COLLATE pg_catalog."default" NOT NULL,
            "firstName" CHARACTER VARYING COLLATE pg_catalog."default",
            "lastName" CHARACTER VARYING COLLATE pg_catalog."default",
            email CHARACTER VARYING COLLATE pg_catalog."default" NOT NULL,
            "createdDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
            CONSTRAINT "PK_user_id" PRIMARY KEY (id),
            CONSTRAINT "UQ_userName" UNIQUE ("userName"),
            CONSTRAINT "UQ_email" UNIQUE (email)

        )
        `);
        await queryRunner.query(`ALTER TABLE "user" OWNER to postgres`);

        // TYPE TABLE
        await queryRunner.query(`
        CREATE TABLE type
        (
            id SERIAL NOT NULL,
            name CHARACTER VARYING COLLATE pg_catalog."default" NOT NULL,
            CONSTRAINT "PK_type_id" PRIMARY KEY (id)
        )`);
        await queryRunner.query('ALTER TABLE type OWNER to postgres');

        // LOCATION TABLE
        await queryRunner.query(`
        CREATE TABLE location
        (
            id SERIAL NOT NULL,
            name TEXT COLLATE pg_catalog."default" NOT NULL,
            address TEXT COLLATE pg_catalog."default" NOT NULL,
            coordinates TEXT COLLATE pg_catalog."default" NOT NULL,
            "userId" INTEGER NOT NULL,
            CONSTRAINT "PK_location_id" PRIMARY KEY (id),
            CONSTRAINT "FK_location_user_userId" FOREIGN KEY ("userId")
                REFERENCES "user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        `);
        await queryRunner.query('ALTER TABLE location OWNER to postgres');

        // PRODUCE TABLE
        await queryRunner.query(`
        CREATE TABLE produce
        (
            id SERIAL NOT NULL,
            name TEXT COLLATE pg_catalog."default" NOT NULL,
            "createdDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
            "modifiedDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
            "typeId" INTEGER NOT NULL,
            "locationId" INTEGER NOT NULL,
            "userId" INTEGER NOT NULL,
            CONSTRAINT "PK_produce_id" PRIMARY KEY (id),
            CONSTRAINT "FK_type_typeId" FOREIGN KEY ("typeId")
                REFERENCES type (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT "FK_produce_location_locationId" FOREIGN KEY ("locationId")
                REFERENCES location (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT "FK_produce_user_userId" FOREIGN KEY ("userId")
                REFERENCES "user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        `);
        await queryRunner.query('ALTER TABLE produce OWNER to postgres');

        // PRICE TABLE
        await queryRunner.query(`
        CREATE TABLE price
        (
            id SERIAL NOT NULL,
            price INTEGER NOT NULL,
            unit CHARACTER VARYING COLLATE pg_catalog."default" NOT NULL,
            "createdDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
            active BOOLEAN NOT NULL,
            "produceId" INTEGER NOT NULL,
            "userId" INTEGER NOT NULL,
            CONSTRAINT "PK_price_id" PRIMARY KEY (id),
            CONSTRAINT "FK_price_user_userId" FOREIGN KEY ("userId")
                REFERENCES "user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT "FK_price_produce_produceId" FOREIGN KEY ("produceId")
                REFERENCES produce (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        `);
        await queryRunner.query('ALTER TABLE price OWNER to postgres');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "user" CASCADE');
        await queryRunner.query('DROP TABLE type CASCADE');
        await queryRunner.query('DROP TABLE produce CASCADE');
        await queryRunner.query('DROP TABLE price CASCADE');
        await queryRunner.query('DROP TABLE location CASCADE');
    }

}
