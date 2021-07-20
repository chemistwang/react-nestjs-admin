import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'member',
  timestamps: false,
  freezeTableName: true,
})
export class Member extends Model {
    @Column({
        primaryKey: true,
        comment: '人员id',
    })
    id: number;

    @Column({
        comment: '头像'
    })
    avator: string;

    @Column({
        comment: '姓名'
    })
    name: string;

    @Column({
        comment: '工号'
    })
    number: string;

    @Column({
        comment: '性别'
    })
    gender: number;

    @Column({
        comment: '部门'
    })
    department: string;

    @Column({
        comment: '职位'
    })
    job: string;

    @Column({
        comment: '手机号码'
    })
    phone: string;

    @Column({
        comment: '出生日期'
    })
    birth: string;

    @Column({
        comment: '添加人'
    })
    creator: string;

    @Column({
        comment: '添加时间'
    })
    createTime: string;

}
