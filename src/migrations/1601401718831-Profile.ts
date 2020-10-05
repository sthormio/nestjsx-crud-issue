import { MigrationInterface, QueryRunner } from 'typeorm';

export class Profile1601401718831 implements MigrationInterface {
    name = 'Profile1601401718831';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "username" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, 
            CONSTRAINT "REL_d752442f45f258a8bdefeebb2f" 
            UNIQUE ("user_id"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            'ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"',
        );
        await queryRunner.query(
            "CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'ADMIN')",
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT',
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum" USING "role"::"text"::"users_role_enum"',
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT \'USER\'',
        );
        await queryRunner.query('DROP TYPE "users_role_enum_old"');
        await queryRunner.query(
            `ALTER TABLE "profile" ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") 
            REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"',
        );
        await queryRunner.query(
            'CREATE TYPE "users_role_enum_old" AS ENUM(\'USER\')',
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT',
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum_old" USING "role"::"text"::"users_role_enum_old"',
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT \'USER\'',
        );
        await queryRunner.query('DROP TYPE "users_role_enum"');
        await queryRunner.query(
            'ALTER TYPE "users_role_enum_old" RENAME TO  "users_role_enum"',
        );
        await queryRunner.query('DROP TABLE "profile"');
    }
}
