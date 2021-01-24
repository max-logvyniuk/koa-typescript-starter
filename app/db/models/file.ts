import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ColumnType,
  EntityManager
} from 'typeorm';
import { DataTypes } from 'sequelize';
// import Address from '../address/address.entity';
// import Post from '../post/post.entity';

@Entity()
class Files extends EntityManager {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public type: string;

  @Column()
  public fileName: string;

  // @Column()
  // public description: string;

  @Column()
  public data: string;

  // @OneToOne(() => Address, (address: Address) => address.user, {
  //   cascade: true,
  //   eager: true,
  // })
  // @JoinColumn()
  // public address: Address;
  //
  // @OneToMany(() => Post, (post: Post) => post.author)
  // public posts: Post[];
}

export default Files;
