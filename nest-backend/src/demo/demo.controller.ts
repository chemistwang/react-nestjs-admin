import {
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Community } from 'src/model/community.model';
import { OperationLog } from 'src/model/operationLog.model';
import { DemoService } from 'src/demo/demo.service';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';

@ApiBearerAuth()
@ApiTags('Demo Tags')
@UseInterceptors(LoggingInterceptor)
@Controller('/demo')
export class DemoController {
  constructor(
    private readonly demoService: DemoService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @ApiOperation({ summary: 'fetch operation log' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('/fetchlog')
  fetchAllOperionLog(): Promise<OperationLog[]> {
    return this.demoService.findAllOperation();
  }

  @ApiOperation({ summary: 'fetch community data' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('/fetchcommunity')
  fetchAllCommunity(): Promise<Community[]> {
    return this.demoService.findAllCommunity();
  }

  @ApiOperation({ summary: 'set redis data' })
  @Get('setRedis')
  async setRedis(): Promise<string> {
    const result = await this.redis.set('key', 'Redis data!');
    return result;
  }

  @ApiOperation({ summary: 'get redis data' })
  @Get('getRedis')
  async getRedis(): Promise<string> {
    const redisData = await this.redis.get('key');
    return `success get redis: ${redisData}`;
  }

  @ApiOperation({ summary: 'get method' })
  @Get('/get')
  getMethod() {
    return 'get method';
  }

  @ApiOperation({ summary: 'post method' })
  // @HttpCode(204)
  @Post('/post')
  postMethod() {
    return 'post method';
  }
}
