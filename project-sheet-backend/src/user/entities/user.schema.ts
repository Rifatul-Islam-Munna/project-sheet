import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';



export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
 
  @Prop({ required: true, unique: true })

  email: string;


  @Prop({ required: true })
 
  name: string;

 
  @Prop()
  

  phone?: string;


  @Prop()

  class?: string;

 
  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
 
  role: UserRole;
  @Prop()
  password:string
}

export const UserSchema = SchemaFactory.createForClass(User);
