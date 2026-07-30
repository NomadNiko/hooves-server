import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type RideSchemaDocument = HydratedDocument<RideSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class RideSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: Boolean,
  })
  paid?: boolean;

  @Prop({
    type: String,
  })
  driverName?: string | null;

  @Prop({
    type: String,
  })
  driverId?: string | null;

  @Prop({
    type: Number,
  })
  fare?: number | null;

  @Prop({
    type: String,
  })
  status?: string | null;

  @Prop({
    type: String,
  })
  dropoff: string;

  @Prop({
    type: String,
  })
  pickup: string;

  @Prop({
    type: Number,
  })
  pickupLat?: number | null;

  @Prop({
    type: Number,
  })
  pickupLng?: number | null;

  @Prop({
    type: Number,
  })
  dropoffLat?: number | null;

  @Prop({
    type: Number,
  })
  dropoffLng?: number | null;

  @Prop({
    type: String,
  })
  riderName?: string | null;

  @Prop({
    type: String,
  })
  riderId: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const RideSchema = SchemaFactory.createForClass(RideSchemaClass);
