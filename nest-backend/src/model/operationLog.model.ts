import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'operation_log',
  timestamps: false,
  freezeTableName: true,
})
export class OperationLog extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  scene: string;

  @Column
  method: string;

  @Column
  url: string;
}
