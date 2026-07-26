import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriverProfileSchemaClass } from '../entities/driver-profile.schema';
import { DriverProfileRepository } from '../../driver-profile.repository';
import { DriverProfile } from '../../../../domain/driver-profile';
import { DriverProfileMapper } from '../mappers/driver-profile.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DriverProfileDocumentRepository implements DriverProfileRepository {
  constructor(
    @InjectModel(DriverProfileSchemaClass.name)
    private readonly driverProfileModel: Model<DriverProfileSchemaClass>,
  ) {}

  async create(data: DriverProfile): Promise<DriverProfile> {
    const persistenceModel = DriverProfileMapper.toPersistence(data);
    const createdEntity = new this.driverProfileModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return DriverProfileMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<DriverProfile[]> {
    const entityObjects = await this.driverProfileModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      DriverProfileMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: DriverProfile['id'],
  ): Promise<NullableType<DriverProfile>> {
    const entityObject = await this.driverProfileModel.findById(id);
    return entityObject ? DriverProfileMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: DriverProfile['id'][]): Promise<DriverProfile[]> {
    const entityObjects = await this.driverProfileModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      DriverProfileMapper.toDomain(entityObject),
    );
  }

  async update(
    id: DriverProfile['id'],
    payload: Partial<DriverProfile>,
  ): Promise<NullableType<DriverProfile>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.driverProfileModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.driverProfileModel.findOneAndUpdate(
      filter,
      DriverProfileMapper.toPersistence({
        ...DriverProfileMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? DriverProfileMapper.toDomain(entityObject) : null;
  }

  async remove(id: DriverProfile['id']): Promise<void> {
    await this.driverProfileModel.deleteOne({ _id: id });
  }
}
