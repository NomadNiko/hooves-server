// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRideDto } from './create-ride.dto';

export class UpdateRideDto extends PartialType(CreateRideDto) {}
