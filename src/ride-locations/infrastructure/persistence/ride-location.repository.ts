import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RideLocation } from '../../domain/ride-location';

export abstract class RideLocationRepository {
  abstract create(
    data: Omit<RideLocation, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RideLocation>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RideLocation[]>;

  abstract findById(
    id: RideLocation['id'],
  ): Promise<NullableType<RideLocation>>;

  abstract findByIds(ids: RideLocation['id'][]): Promise<RideLocation[]>;

  abstract update(
    id: RideLocation['id'],
    payload: DeepPartial<RideLocation>,
  ): Promise<RideLocation | null>;

  abstract remove(id: RideLocation['id']): Promise<void>;
}
