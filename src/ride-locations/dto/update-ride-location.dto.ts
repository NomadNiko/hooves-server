// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRideLocationDto } from './create-ride-location.dto';

export class UpdateRideLocationDto extends PartialType(CreateRideLocationDto) {}
