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
import { PoliceService } from './police.service';

@ApiTags('警员管理')
@Controller('police')
export class PoliceController {
  constructor(private readonly policeService: PoliceService) {}
}
