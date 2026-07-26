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
import { DriverProfilesService } from './driver-profiles.service';
import { CreateDriverProfileDto } from './dto/create-driver-profile.dto';
import { UpdateDriverProfileDto } from './dto/update-driver-profile.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DriverProfile } from './domain/driver-profile';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllDriverProfilesDto } from './dto/find-all-driver-profiles.dto';

@ApiTags('Driverprofiles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'driver-profiles',
  version: '1',
})
export class DriverProfilesController {
  constructor(private readonly driverProfilesService: DriverProfilesService) {}

  @Post()
  @ApiCreatedResponse({
    type: DriverProfile,
  })
  create(@Body() createDriverProfileDto: CreateDriverProfileDto) {
    return this.driverProfilesService.create(createDriverProfileDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(DriverProfile),
  })
  async findAll(
    @Query() query: FindAllDriverProfilesDto,
  ): Promise<InfinityPaginationResponseDto<DriverProfile>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.driverProfilesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: DriverProfile,
  })
  findById(@Param('id') id: string) {
    return this.driverProfilesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: DriverProfile,
  })
  update(
    @Param('id') id: string,
    @Body() updateDriverProfileDto: UpdateDriverProfileDto,
  ) {
    return this.driverProfilesService.update(id, updateDriverProfileDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.driverProfilesService.remove(id);
  }
}
