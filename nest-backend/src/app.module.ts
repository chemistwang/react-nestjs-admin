import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// redis
import { IORedisModule } from './db/redis';
// postgres
// import { PostgresModule } from './db/postgres';
import { DatabaseModule } from './db/database.module';

// demo
import { DemoModule } from './demo/demo.module';

//middle
import { LoggerMiddleware } from './common/middleware/logger.middleware';
//monitor
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { UserModule } from './user/user.module';
import { StationModule } from './station/station.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

//monitor

@Module({
  imports: [
    // demo
    DemoModule,
    //db
    IORedisModule,
    DatabaseModule,
    // PostgresModule,
    // monitor
    StatusMonitorModule.forRoot(),
    // cron
    // ScheduleModule.forRoot(),
    CronModule,
    //module
    AuthModule,
    // UserModule,
    StationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.POST,
    // });
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
