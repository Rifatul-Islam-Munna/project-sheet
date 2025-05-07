import {  Connection, HydratedDocument } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';

export type ClassDocument = HydratedDocument<Class>
export enum Division {
  Science = "science",
  Commerce = "commerce",
  Arts = "arts"
}
@NestSchema()
export class Class {
  @Prop()
  imageUrl: string;

  @Prop()
  title: string;

  @Prop()
  desc: string;
  @Prop()
  className:string
  @Prop()
  base:string
  @Prop({enum:Division,required:false})
  division:string
  @Prop()
  subject:string
  @Prop()
  year:string
}


export const ClassSchema = SchemaFactory.createForClass(Class);

