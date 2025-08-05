import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type CompanyDocument = HydratedDocument<Company>;

class UserRef {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String })
  email: string;
}

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;

  @Prop({ type: UserRef })
  createdBy: UserRef;

  @Prop({ type: UserRef })
  updatedBy: UserRef;

  @Prop({ type: UserRef })
  deletedBy: UserRef;

  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.plugin(softDeletePlugin);
