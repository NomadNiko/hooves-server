// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateDriverProfileDto } from './create-driver-profile.dto';

export class UpdateDriverProfileDto extends PartialType(
  CreateDriverProfileDto,
) {}
