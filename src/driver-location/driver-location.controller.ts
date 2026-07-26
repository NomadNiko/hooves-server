import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { DriverProfilesService } from '../driver-profiles/driver-profiles.service';
import { RideLocationsService } from '../ride-locations/ride-locations.service';
import { RidesService } from '../rides/rides.service';

class PingLocationDto {
  // These decorators are required: the global ValidationPipe runs with
  // `whitelist: true`, which silently strips any property that has no
  // validation decorator. Without them lat/lng arrive as undefined.
  @ApiProperty({ type: Number, example: 45.8503 })
  @IsLatitude()
  lat: number;

  @ApiProperty({ type: Number, example: -84.6186 })
  @IsLongitude()
  lng: number;
}

class PingLocationResponse {
  updated: boolean;
  breadcrumbRecorded: boolean;
  activeRideId?: string;
}

@ApiTags('Driver Location')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'driver-location',
  version: '1',
})
export class DriverLocationController {
  constructor(
    private readonly driverProfilesService: DriverProfilesService,
    private readonly rideLocationsService: RideLocationsService,
    private readonly ridesService: RidesService,
  ) {}

  @Post('ping')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PingLocationResponse })
  async ping(
    @Request() req: { user: { id: string } },
    @Body() dto: PingLocationDto,
  ): Promise<PingLocationResponse> {
    const userId = req.user.id;

    // 1. Find driver profile by userId
    const profiles = await this.driverProfilesService.findAllWithPagination({
      paginationOptions: { page: 1, limit: 100 },
    });
    const profile = profiles.find((p) => p.userId === userId);

    if (!profile) {
      return { updated: false, breadcrumbRecorded: false };
    }

    // 2. Update driver profile lat/lng
    await this.driverProfilesService.update(profile.id, {
      lat: dto.lat,
      lng: dto.lng,
    });

    // 3. Check for active ride and record breadcrumb
    let breadcrumbRecorded = false;
    let activeRideId: string | undefined;

    const rides = await this.ridesService.findAllWithPagination({
      paginationOptions: { page: 1, limit: 100 },
    });
    const activeRide = rides.find(
      (r) =>
        r.driverId === userId &&
        (r.status === 'accepted' || r.status === 'in_progress'),
    );

    if (activeRide) {
      activeRideId = activeRide.id;
      await this.rideLocationsService.create({
        rideId: activeRide.id,
        driverId: userId,
        lat: dto.lat,
        lng: dto.lng,
      });
      breadcrumbRecorded = true;
    }

    return { updated: true, breadcrumbRecorded, activeRideId };
  }
}
