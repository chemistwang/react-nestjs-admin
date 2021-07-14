import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStationDto {
  @ApiProperty({ example: '高陵公安分局', description: '单位名称' })
  @IsNotEmpty()
  readonly stationName: string;

  @ApiProperty({ example: 'admin', description: '创建人' })
  @IsNotEmpty()
  readonly creator: string;
}
