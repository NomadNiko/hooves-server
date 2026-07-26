import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RideLocationsService } from './ride-locations.service';
import { RideLocationsController } from './ride-locations.controller';
import { DocumentRideLocationPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    DocumentRideLocationPersistenceModule,
  ],
  controllers: [RideLocationsController],
  providers: [RideLocationsService],
  exports: [RideLocationsService, DocumentRideLocationPersistenceModule],
})
export class RideLocationsModule {}
