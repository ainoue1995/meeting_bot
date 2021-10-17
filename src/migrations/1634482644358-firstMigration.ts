import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1634482644358 implements MigrationInterface {
    name = 'firstMigration1634482644358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "members" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "meetingIdId" integer, CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetings" ("id" SERIAL NOT NULL, "name" character varying(10) NOT NULL, "place" character varying(10) NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_8325cff5f218d64c5efed44e92f" FOREIGN KEY ("meetingIdId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_8325cff5f218d64c5efed44e92f"`);
        await queryRunner.query(`DROP TABLE "meetings"`);
        await queryRunner.query(`DROP TABLE "members"`);
    }

}
