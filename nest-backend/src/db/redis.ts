import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: 'redis://127.0.0.1:6379',
      },
    }),
  ],
})
export class IORedisModule {}
