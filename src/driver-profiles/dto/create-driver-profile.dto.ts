import {
  // decorators here

  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateDriverProfileDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  lng?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  lat?: number | null;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  carriageName?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  bio?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  displayName: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  userId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
