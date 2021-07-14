import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'psql',
      password: 'herin123',
      database: 'herindemo',
      models: [],
    }),
  ],
})
export class PostgresModule {}
