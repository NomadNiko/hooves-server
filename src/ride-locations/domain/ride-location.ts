import { ApiProperty } from '@nestjs/swagger';

export class RideLocation {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  lng: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  lat: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  driverId: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  rideId: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
