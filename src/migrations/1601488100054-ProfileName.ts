import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileName1601488100054 implements MigrationInterface {
    name = 'ProfileName1601488100054';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "profile" ADD "name" character varying(100)',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "profile" DROP COLUMN "name"');
    }
}
