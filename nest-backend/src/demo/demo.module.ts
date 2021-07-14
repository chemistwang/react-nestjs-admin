import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/db/database.module';

import { DemoController } from 'src/demo/demo.controller';
import { DemoService } from 'src/demo/demo.service';

import { repositoryProviders } from 'src/repository/repository.providers';

@Module({
  imports: [DatabaseModule],
  providers: [DemoService, ...repositoryProviders],
  controllers: [DemoController],
})
export class DemoModule {}
