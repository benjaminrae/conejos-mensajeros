import { MigrationInterface, QueryRunner } from "typeorm";

export class Uploader1696112807986 implements MigrationInterface {
    name = 'Uploader1696112807986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_credentials" ("id" uuid NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, "password" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_5cadc04d03e2d9fe76e1b44eb34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "uploads" ("id" uuid NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, "owner_id" uuid NOT NULL, "status" character varying NOT NULL, "filename" character varying NOT NULL, "file_size" integer NOT NULL, "mimetype" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_d1781d1eedd7459314f60f39bd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "uploads"`);
        await queryRunner.query(`DROP TABLE "user_credentials"`);
    }

}
