
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Class } from 'src/class/entities/class.schema';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema({timestamps:true})
export class Subject {
 @Prop({ref:Class.name, type:mongoose.Schema.Types.ObjectId,required:true})
 classId:string
 @Prop({required:true})
  className:string
  
  @Prop()
  subjectName: string;

  @Prop({default:0})
  Topic: number
 @Prop({default:0})
  subTopic:number
  @Prop({default:0})
  time:number
  @Prop({default:new Date()})
  createdAt:Date
  

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

