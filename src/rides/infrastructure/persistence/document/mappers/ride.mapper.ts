import { Ride } from '../../../../domain/ride';

import { RideSchemaClass } from '../entities/ride.schema';

export class RideMapper {
  public static toDomain(raw: RideSchemaClass): Ride {
    const domainEntity = new Ride();
    domainEntity.paid = raw.paid;

    domainEntity.driverName = raw.driverName;

    domainEntity.driverId = raw.driverId;

    domainEntity.fare = raw.fare;

    domainEntity.status = raw.status;

    domainEntity.dropoff = raw.dropoff;

    domainEntity.pickup = raw.pickup;

    domainEntity.pickupLat = raw.pickupLat;

    domainEntity.pickupLng = raw.pickupLng;

    domainEntity.dropoffLat = raw.dropoffLat;

    domainEntity.dropoffLng = raw.dropoffLng;

    domainEntity.riderName = raw.riderName;

    domainEntity.riderId = raw.riderId;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Ride): RideSchemaClass {
    const persistenceSchema = new RideSchemaClass();
    persistenceSchema.paid = domainEntity.paid;

    persistenceSchema.driverName = domainEntity.driverName;

    persistenceSchema.driverId = domainEntity.driverId;

    persistenceSchema.fare = domainEntity.fare;

    persistenceSchema.status = domainEntity.status;

    persistenceSchema.dropoff = domainEntity.dropoff;

    persistenceSchema.pickup = domainEntity.pickup;

    persistenceSchema.pickupLat = domainEntity.pickupLat;

    persistenceSchema.pickupLng = domainEntity.pickupLng;

    persistenceSchema.dropoffLat = domainEntity.dropoffLat;

    persistenceSchema.dropoffLng = domainEntity.dropoffLng;

    persistenceSchema.riderName = domainEntity.riderName;

    persistenceSchema.riderId = domainEntity.riderId;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
