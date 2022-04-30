import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role } from './dto/user.dto';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: 'enum',
    values: ['admin', 'superAdmin'],
    allowNull: false,
  })
  role: Role;
}
