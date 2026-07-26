import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type DriverProfileSchemaDocument =
  HydratedDocument<DriverProfileSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class DriverProfileSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: Number,
  })
  lng?: number | null;

  @Prop({
    type: Number,
  })
  lat?: number | null;

  @Prop({
    type: Boolean,
  })
  isActive?: boolean;

  @Prop({
    type: String,
  })
  carriageName?: string | null;

  @Prop({
    type: String,
  })
  bio?: string | null;

  @Prop({
    type: String,
  })
  displayName: string;

  @Prop({
    type: String,
  })
  userId: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const DriverProfileSchema = SchemaFactory.createForClass(
  DriverProfileSchemaClass,
);
