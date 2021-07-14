import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'station',
  freezeTableName: true,
  // timestamps: true,
  createdAt: 'create_date',
  updatedAt: 'modify_date',
})
export class Station extends Model {
  @Column({
    // type: '',
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    comment: '单位id值',
  })
  id: number;

  @Column({
    field: 'station_name',
    // allowNull: false,
  })
  stationName: string;

  @Column({
    type: DataType.STRING,
    // allowNull: false,
  })
  creator: string;
}
