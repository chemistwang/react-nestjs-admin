import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'community',
  timestamps: false,
  freezeTableName: true,
})
export class Community extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  code: number;

  @Column({
    field: 'module_name',
  })
  moduleName: string;

  @Column({
    field: 'field_name',
  })
  fieldName: string;

  @Column
  data: number;
}
