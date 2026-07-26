import { Module } from '@nestjs/common';
import { DriverLocationController } from './driver-location.controller';
import { DriverProfilesModule } from '../driver-profiles/driver-profiles.module';
import { RideLocationsModule } from '../ride-locations/ride-locations.module';
import { RidesModule } from '../rides/rides.module';

@Module({
  imports: [DriverProfilesModule, RideLocationsModule, RidesModule],
  controllers: [DriverLocationController],
})
export class DriverLocationModule {}
