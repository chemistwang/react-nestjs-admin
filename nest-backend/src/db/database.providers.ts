import { Sequelize } from 'sequelize-typescript';
import { Community } from 'src/model/community.model';
import { OperationLog } from 'src/model/operationLog.model';
import { Station } from 'src/model/station.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'herin123',
        database: 'herindemo',
        pool: {
          max: 100,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        timezone: '+08:00', // 东八时区
      });
      sequelize
        .authenticate()
        .then(() => {
          console.log('数据库连接成功...');
        })
        .catch((err: any) => {
          console.log(`数据库连接失败 ${err}`);
        });

      sequelize.addModels([OperationLog, Community, Station]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
