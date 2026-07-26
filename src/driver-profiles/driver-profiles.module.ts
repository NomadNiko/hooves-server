import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { DriverProfilesService } from './driver-profiles.service';
import { DriverProfilesController } from './driver-profiles.controller';
import { DocumentDriverProfilePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    DocumentDriverProfilePersistenceModule,
  ],
  controllers: [DriverProfilesController],
  providers: [DriverProfilesService],
  exports: [DriverProfilesService, DocumentDriverProfilePersistenceModule],
})
export class DriverProfilesModule {}
