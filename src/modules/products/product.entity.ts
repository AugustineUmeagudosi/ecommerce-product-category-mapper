import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Category } from '../category/category.entity';

@Table
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  discount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  price: number;

  // category relationship
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  categoryId: number;
  @BelongsTo(() => Category)
  category: Category;

  // user relationship
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy: number;
  @BelongsTo(() => User)
  user: User;
}
