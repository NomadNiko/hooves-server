import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Ride } from '../../domain/ride';

export abstract class RideRepository {
  abstract create(
    data: Omit<Ride, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Ride>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Ride[]>;

  abstract findById(id: Ride['id']): Promise<NullableType<Ride>>;

  abstract findByIds(ids: Ride['id'][]): Promise<Ride[]>;

  abstract update(
    id: Ride['id'],
    payload: DeepPartial<Ride>,
  ): Promise<Ride | null>;

  abstract remove(id: Ride['id']): Promise<void>;
}
