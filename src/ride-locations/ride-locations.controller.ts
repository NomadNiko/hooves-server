import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RideLocationsService } from './ride-locations.service';
import { CreateRideLocationDto } from './dto/create-ride-location.dto';
import { UpdateRideLocationDto } from './dto/update-ride-location.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RideLocation } from './domain/ride-location';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRideLocationsDto } from './dto/find-all-ride-locations.dto';

@ApiTags('Ridelocations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'ride-locations',
  version: '1',
})
export class RideLocationsController {
  constructor(private readonly rideLocationsService: RideLocationsService) {}

  @Post()
  @ApiCreatedResponse({
    type: RideLocation,
  })
  create(@Body() createRideLocationDto: CreateRideLocationDto) {
    return this.rideLocationsService.create(createRideLocationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(RideLocation),
  })
  async findAll(
    @Query() query: FindAllRideLocationsDto,
  ): Promise<InfinityPaginationResponseDto<RideLocation>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.rideLocationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('by-ride/:rideId')
  @ApiParam({
    name: 'rideId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: [RideLocation],
  })
  async findByRideId(@Param('rideId') rideId: string) {
    // Get all locations and filter by rideId (simple approach for POC)
    const all = await this.rideLocationsService.findAllWithPagination({
      paginationOptions: { page: 1, limit: 1000 },
    });
    return all.filter((loc) => loc.rideId === rideId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RideLocation,
  })
  findById(@Param('id') id: string) {
    return this.rideLocationsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RideLocation,
  })
  update(
    @Param('id') id: string,
    @Body() updateRideLocationDto: UpdateRideLocationDto,
  ) {
    return this.rideLocationsService.update(id, updateRideLocationDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.rideLocationsService.remove(id);
  }
}
