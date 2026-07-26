import { ApiProperty } from '@nestjs/swagger';

export class Ride {
  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  paid?: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  driverName?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  driverId?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  fare?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  dropoff: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  pickup: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  riderName?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  riderId: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
