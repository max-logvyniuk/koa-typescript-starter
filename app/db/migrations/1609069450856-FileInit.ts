import { MigrationInterface, QueryRunner, Table  } from 'typeorm';
import { TableOptions } from 'typeorm/schema-builder/options/TableOptions';

const options: TableOptions = {
  name: 'files',
  columns: [
    {
      name: 'id',
      type: 'integer',
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'title',
      type: 'varchar',
      isUnique: true,
      isNullable: false,
    },
    {
      name: 'data',
      type: 'integer',
      isUnique: true,
      isNullable: false,
    },
    {
      name: 'description',
      type: 'varchar',
      isUnique: false,
      isNullable: false,
    },
  ],
};

export class FileInit1609069450856 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table(options), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files', true);
  }

}
