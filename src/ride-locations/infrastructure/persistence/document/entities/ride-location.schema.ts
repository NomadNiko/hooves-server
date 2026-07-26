import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type RideLocationSchemaDocument =
  HydratedDocument<RideLocationSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class RideLocationSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: Number,
  })
  lng: number;

  @Prop({
    type: Number,
  })
  lat: number;

  @Prop({
    type: String,
  })
  driverId: string;

  @Prop({
    type: String,
  })
  rideId: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const RideLocationSchema = SchemaFactory.createForClass(
  RideLocationSchemaClass,
);
