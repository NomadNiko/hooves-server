import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateDriverProfileDto } from './dto/create-driver-profile.dto';
import { UpdateDriverProfileDto } from './dto/update-driver-profile.dto';
import { DriverProfileRepository } from './infrastructure/persistence/driver-profile.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { DriverProfile } from './domain/driver-profile';

@Injectable()
export class DriverProfilesService {
  constructor(
    // Dependencies here
    private readonly driverProfileRepository: DriverProfileRepository,
  ) {}

  async create(createDriverProfileDto: CreateDriverProfileDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.driverProfileRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      lng: createDriverProfileDto.lng,

      lat: createDriverProfileDto.lat,

      isActive: createDriverProfileDto.isActive,

      carriageName: createDriverProfileDto.carriageName,

      bio: createDriverProfileDto.bio,

      displayName: createDriverProfileDto.displayName,

      userId: createDriverProfileDto.userId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.driverProfileRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: DriverProfile['id']) {
    return this.driverProfileRepository.findById(id);
  }

  findByIds(ids: DriverProfile['id'][]) {
    return this.driverProfileRepository.findByIds(ids);
  }

  async update(
    id: DriverProfile['id'],

    updateDriverProfileDto: UpdateDriverProfileDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.driverProfileRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      lng: updateDriverProfileDto.lng,

      lat: updateDriverProfileDto.lat,

      isActive: updateDriverProfileDto.isActive,

      carriageName: updateDriverProfileDto.carriageName,

      bio: updateDriverProfileDto.bio,

      displayName: updateDriverProfileDto.displayName,

      userId: updateDriverProfileDto.userId,
    });
  }

  remove(id: DriverProfile['id']) {
    return this.driverProfileRepository.remove(id);
  }
}
