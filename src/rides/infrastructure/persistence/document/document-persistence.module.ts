import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RideSchema, RideSchemaClass } from './entities/ride.schema';
import { RideRepository } from '../ride.repository';
import { RideDocumentRepository } from './repositories/ride.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RideSchemaClass.name, schema: RideSchema },
    ]),
  ],
  providers: [
    {
      provide: RideRepository,
      useClass: RideDocumentRepository,
    },
  ],
  exports: [RideRepository],
})
export class DocumentRidePersistenceModule {}
