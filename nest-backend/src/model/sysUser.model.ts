import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'sys_user',
  timestamps: false,
  freezeTableName: true,
})
export class SysUser extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column({ field: 'user_name' })
  userName: string;

  @Column({ field: 'password' })
  password: string;
}
