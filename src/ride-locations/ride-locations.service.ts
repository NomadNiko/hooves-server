import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateRideLocationDto } from './dto/create-ride-location.dto';
import { UpdateRideLocationDto } from './dto/update-ride-location.dto';
import { RideLocationRepository } from './infrastructure/persistence/ride-location.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RideLocation } from './domain/ride-location';

@Injectable()
export class RideLocationsService {
  constructor(
    // Dependencies here
    private readonly rideLocationRepository: RideLocationRepository,
  ) {}

  async create(createRideLocationDto: CreateRideLocationDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.rideLocationRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      lng: createRideLocationDto.lng,

      lat: createRideLocationDto.lat,

      driverId: createRideLocationDto.driverId,

      rideId: createRideLocationDto.rideId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rideLocationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: RideLocation['id']) {
    return this.rideLocationRepository.findById(id);
  }

  findByIds(ids: RideLocation['id'][]) {
    return this.rideLocationRepository.findByIds(ids);
  }

  async update(
    id: RideLocation['id'],

    updateRideLocationDto: UpdateRideLocationDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.rideLocationRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      lng: updateRideLocationDto.lng,

      lat: updateRideLocationDto.lat,

      driverId: updateRideLocationDto.driverId,

      rideId: updateRideLocationDto.rideId,
    });
  }

  remove(id: RideLocation['id']) {
    return this.rideLocationRepository.remove(id);
  }
}
