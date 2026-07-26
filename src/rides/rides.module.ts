import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { DocumentRidePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    DocumentRidePersistenceModule,
  ],
  controllers: [RidesController],
  providers: [RidesService],
  exports: [RidesService, DocumentRidePersistenceModule],
})
export class RidesModule {}
