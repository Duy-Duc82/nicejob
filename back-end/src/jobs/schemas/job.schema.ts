import { IsEmail } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type JobDocument = HydratedDocument<Job> & {
  createdAt: Date;
  updatedAt: Date;
};
class UserRef {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String })
  email: string;
}

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  skills: string[];

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    logo: string;
  };

  @Prop()
  salary: number;

  @Prop()
  quantity: string;

  @Prop()
  level: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: UserRef })
  createdBy: UserRef;

  @Prop({ type: UserRef })
  updatedBy: UserRef;

  @Prop({ type: UserRef })
  deletedBy: UserRef;
}

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.plugin(softDeletePlugin);
