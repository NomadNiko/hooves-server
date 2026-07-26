import { ApiProperty } from '@nestjs/swagger';

export class DriverProfile {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  lng?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  lat?: number | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  isActive?: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  carriageName?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  bio?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  displayName: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  userId: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
