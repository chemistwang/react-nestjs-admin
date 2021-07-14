import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/repository/repository.providers';
import { StationController } from './station.controller';
import { StationService } from './station.service';

@Module({
  controllers: [StationController],
  providers: [StationService, ...repositoryProviders],
})
export class StationModule {}
