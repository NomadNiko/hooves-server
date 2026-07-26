import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RideLocationSchema,
  RideLocationSchemaClass,
} from './entities/ride-location.schema';
import { RideLocationRepository } from '../ride-location.repository';
import { RideLocationDocumentRepository } from './repositories/ride-location.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RideLocationSchemaClass.name, schema: RideLocationSchema },
    ]),
  ],
  providers: [
    {
      provide: RideLocationRepository,
      useClass: RideLocationDocumentRepository,
    },
  ],
  exports: [RideLocationRepository],
})
export class DocumentRideLocationPersistenceModule {}
