import { DriverProfile } from '../../../../domain/driver-profile';

import { DriverProfileSchemaClass } from '../entities/driver-profile.schema';

export class DriverProfileMapper {
  public static toDomain(raw: DriverProfileSchemaClass): DriverProfile {
    const domainEntity = new DriverProfile();
    domainEntity.lng = raw.lng;

    domainEntity.lat = raw.lat;

    domainEntity.isActive = raw.isActive;

    domainEntity.carriageName = raw.carriageName;

    domainEntity.bio = raw.bio;

    domainEntity.displayName = raw.displayName;

    domainEntity.userId = raw.userId;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: DriverProfile,
  ): DriverProfileSchemaClass {
    const persistenceSchema = new DriverProfileSchemaClass();
    persistenceSchema.lng = domainEntity.lng;

    persistenceSchema.lat = domainEntity.lat;

    persistenceSchema.isActive = domainEntity.isActive;

    persistenceSchema.carriageName = domainEntity.carriageName;

    persistenceSchema.bio = domainEntity.bio;

    persistenceSchema.displayName = domainEntity.displayName;

    persistenceSchema.userId = domainEntity.userId;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
