import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'chemputer', description: '登录用户名' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'chemputer123', description: '登录密码' })
  @IsString()
  readonly password: string;
}
