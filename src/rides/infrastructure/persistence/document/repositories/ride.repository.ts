import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RideSchemaClass } from '../entities/ride.schema';
import { RideRepository } from '../../ride.repository';
import { Ride } from '../../../../domain/ride';
import { RideMapper } from '../mappers/ride.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RideDocumentRepository implements RideRepository {
  constructor(
    @InjectModel(RideSchemaClass.name)
    private readonly rideModel: Model<RideSchemaClass>,
  ) {}

  async create(data: Ride): Promise<Ride> {
    const persistenceModel = RideMapper.toPersistence(data);
    const createdEntity = new this.rideModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return RideMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Ride[]> {
    const entityObjects = await this.rideModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      RideMapper.toDomain(entityObject),
    );
  }

  async findById(id: Ride['id']): Promise<NullableType<Ride>> {
    const entityObject = await this.rideModel.findById(id);
    return entityObject ? RideMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Ride['id'][]): Promise<Ride[]> {
    const entityObjects = await this.rideModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      RideMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Ride['id'],
    payload: Partial<Ride>,
  ): Promise<NullableType<Ride>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.rideModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.rideModel.findOneAndUpdate(
      filter,
      RideMapper.toPersistence({
        ...RideMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? RideMapper.toDomain(entityObject) : null;
  }

  async remove(id: Ride['id']): Promise<void> {
    await this.rideModel.deleteOne({ _id: id });
  }
}
