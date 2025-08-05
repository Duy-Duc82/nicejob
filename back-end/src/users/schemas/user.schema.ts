import { IsEmail } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Role } from '@app/roles/schemas/role.schema';

export type UserDocument = HydratedDocument<User> & {
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
export class User {
  @Prop({ required: true })
  name: string;
  @IsEmail()
  @Prop({ required: true })
  email: string; //username

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    name: string;
  };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  role: mongoose.Schema.Types.ObjectId;

  @Prop()
  refreshToken: string;

  @Prop({ type: UserRef })
  createdBy: UserRef;

  @Prop({ type: UserRef })
  updatedBy: UserRef;

  @Prop({ type: UserRef })
  deletedBy: UserRef;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(softDeletePlugin);
