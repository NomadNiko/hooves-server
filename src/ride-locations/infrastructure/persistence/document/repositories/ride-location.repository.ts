import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RideLocationSchemaClass } from '../entities/ride-location.schema';
import { RideLocationRepository } from '../../ride-location.repository';
import { RideLocation } from '../../../../domain/ride-location';
import { RideLocationMapper } from '../mappers/ride-location.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RideLocationDocumentRepository implements RideLocationRepository {
  constructor(
    @InjectModel(RideLocationSchemaClass.name)
    private readonly rideLocationModel: Model<RideLocationSchemaClass>,
  ) {}

  async create(data: RideLocation): Promise<RideLocation> {
    const persistenceModel = RideLocationMapper.toPersistence(data);
    const createdEntity = new this.rideLocationModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return RideLocationMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RideLocation[]> {
    const entityObjects = await this.rideLocationModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      RideLocationMapper.toDomain(entityObject),
    );
  }

  async findById(id: RideLocation['id']): Promise<NullableType<RideLocation>> {
    const entityObject = await this.rideLocationModel.findById(id);
    return entityObject ? RideLocationMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: RideLocation['id'][]): Promise<RideLocation[]> {
    const entityObjects = await this.rideLocationModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      RideLocationMapper.toDomain(entityObject),
    );
  }

  async update(
    id: RideLocation['id'],
    payload: Partial<RideLocation>,
  ): Promise<NullableType<RideLocation>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.rideLocationModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.rideLocationModel.findOneAndUpdate(
      filter,
      RideLocationMapper.toPersistence({
        ...RideLocationMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? RideLocationMapper.toDomain(entityObject) : null;
  }

  async remove(id: RideLocation['id']): Promise<void> {
    await this.rideLocationModel.deleteOne({ _id: id });
  }
}
