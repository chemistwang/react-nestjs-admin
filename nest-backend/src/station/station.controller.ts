import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStationDto } from 'src/dto/station/create-station.dto';
import { UpdateStationDto } from 'src/dto/station/update-station.dto';
import { StationService } from './station.service';

@ApiTags('组织架构模块')
@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @ApiOperation({ summary: '创建单位' })
  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationService.create(createStationDto);
  }

  @ApiOperation({ summary: '删除单位' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id + '=========');
    return this.stationService.remove(id);
  }

  @ApiOperation({ summary: '更新单位' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    console.log(id + 'xxxxxxxxx');
    return this.stationService.update(id, updateStationDto);
  }

  @ApiOperation({ summary: '查询单位' })
  @Get()
  find() {
    return this.stationService.find();
  }
}
