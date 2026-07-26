import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { DriverProfile } from '../../domain/driver-profile';

export abstract class DriverProfileRepository {
  abstract create(
    data: Omit<DriverProfile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<DriverProfile>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<DriverProfile[]>;

  abstract findById(
    id: DriverProfile['id'],
  ): Promise<NullableType<DriverProfile>>;

  abstract findByIds(ids: DriverProfile['id'][]): Promise<DriverProfile[]>;

  abstract update(
    id: DriverProfile['id'],
    payload: DeepPartial<DriverProfile>,
  ): Promise<DriverProfile | null>;

  abstract remove(id: DriverProfile['id']): Promise<void>;
}
