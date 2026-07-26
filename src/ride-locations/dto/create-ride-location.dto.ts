import {
  // decorators here

  IsString,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateRideLocationDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  lng: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  lat: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  driverId: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  rideId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
