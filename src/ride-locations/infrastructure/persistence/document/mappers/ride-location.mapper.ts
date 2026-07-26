import { RideLocation } from '../../../../domain/ride-location';

import { RideLocationSchemaClass } from '../entities/ride-location.schema';

export class RideLocationMapper {
  public static toDomain(raw: RideLocationSchemaClass): RideLocation {
    const domainEntity = new RideLocation();
    domainEntity.lng = raw.lng;

    domainEntity.lat = raw.lat;

    domainEntity.driverId = raw.driverId;

    domainEntity.rideId = raw.rideId;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: RideLocation,
  ): RideLocationSchemaClass {
    const persistenceSchema = new RideLocationSchemaClass();
    persistenceSchema.lng = domainEntity.lng;

    persistenceSchema.lat = domainEntity.lat;

    persistenceSchema.driverId = domainEntity.driverId;

    persistenceSchema.rideId = domainEntity.rideId;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
