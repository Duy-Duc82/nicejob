import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedArraySubdocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
export type SubscriberDocument = HydratedArraySubdocument<Subscriber>;

@Schema({ timestamps: true })
export class Subscriber {
  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  skills: string[];

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
SubscriberSchema.plugin(softDeletePlugin);
