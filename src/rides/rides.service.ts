import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { RideRepository } from './infrastructure/persistence/ride.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Ride } from './domain/ride';

@Injectable()
export class RidesService {
  constructor(
    // Dependencies here
    private readonly rideRepository: RideRepository,
  ) {}

  async create(createRideDto: CreateRideDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.rideRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      paid: createRideDto.paid,

      driverName: createRideDto.driverName,

      driverId: createRideDto.driverId,

      fare: createRideDto.fare,

      status: createRideDto.status,

      dropoff: createRideDto.dropoff,

      pickup: createRideDto.pickup,

      riderName: createRideDto.riderName,

      riderId: createRideDto.riderId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rideRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Ride['id']) {
    return this.rideRepository.findById(id);
  }

  findByIds(ids: Ride['id'][]) {
    return this.rideRepository.findByIds(ids);
  }

  async update(
    id: Ride['id'],

    updateRideDto: UpdateRideDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.rideRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      paid: updateRideDto.paid,

      driverName: updateRideDto.driverName,

      driverId: updateRideDto.driverId,

      fare: updateRideDto.fare,

      status: updateRideDto.status,

      dropoff: updateRideDto.dropoff,

      pickup: updateRideDto.pickup,

      riderName: updateRideDto.riderName,

      riderId: updateRideDto.riderId,
    });
  }

  remove(id: Ride['id']) {
    return this.rideRepository.remove(id);
  }
}
