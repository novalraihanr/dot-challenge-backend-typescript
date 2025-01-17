import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Book extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_book: number;

  @Column
  title: string;

  @Column
  total_page: number;

  @Column
  author: string;

  @Column({ defaultValue: 0 })
  current_page: number;

  @Column({ defaultValue: false })
  doneReading: boolean;

  @BelongsTo(() => User, 'user_id')
  owner: number;
}
