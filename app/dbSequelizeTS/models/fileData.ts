import { Table, Column, Model, HasMany, Default, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'filesData',
  // paranoid: true,
})
class FileData extends Model<FileData> {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.TEXT)
  type: string;

  @Column(DataType.TEXT)
  fileName: string;

  @Default('[]')
  @Column(DataType.TEXT)
  set data(value: string) {
    this.setDataValue('data', JSON.stringify(value));
  }
  get data() {
    const v: string = this.getDataValue('data');
    return JSON.parse(v);
  }

  // @HasMany(() => Hobby)
  // hobbies: Hobby[];
}

export default FileData;
