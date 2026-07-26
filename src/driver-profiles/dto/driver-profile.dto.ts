import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DriverProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
