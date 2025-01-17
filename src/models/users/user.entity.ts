import { AutoIncrement, HasMany, Model, Unique } from 'sequelize-typescript';
import {
  Column,
  CreatedAt,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Book } from '../books/book.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  name: string;

  @HasMany(() => Book, 'id_book')
  borrowed: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
