import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RideDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
