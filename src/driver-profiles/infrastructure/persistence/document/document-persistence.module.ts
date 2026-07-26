import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DriverProfileSchema,
  DriverProfileSchemaClass,
} from './entities/driver-profile.schema';
import { DriverProfileRepository } from '../driver-profile.repository';
import { DriverProfileDocumentRepository } from './repositories/driver-profile.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DriverProfileSchemaClass.name, schema: DriverProfileSchema },
    ]),
  ],
  providers: [
    {
      provide: DriverProfileRepository,
      useClass: DriverProfileDocumentRepository,
    },
  ],
  exports: [DriverProfileRepository],
})
export class DocumentDriverProfilePersistenceModule {}
