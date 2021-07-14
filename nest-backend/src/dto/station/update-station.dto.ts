import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateStationDto {
  @ApiProperty({ example: '高陵公安分局', description: '单位名称' })
  @IsNotEmpty()
  readonly stationName: string;
}
