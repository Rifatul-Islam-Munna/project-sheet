
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Subject } from 'src/subject/entities/subject.schema';

export type TopicDocument = HydratedDocument<Topic>;
@Schema()
export class SubTopic {
  @Prop({ required: true })
  name: string;

  @Prop()
  key: string;
}

export const SubTopicSchema = SchemaFactory.createForClass(SubTopic);
@Schema({timestamps:true})
export class Topic {
  @Prop({ref:Subject.name, type:mongoose.Schema.Types.ObjectId,required:true})
  subjectId:string
  @Prop({required:true})
  topicName: string;
  @Prop({ type: [SubTopicSchema],default: []})
  SubTopic:{
    name:string,
    key?:string
  }[]
  
 @Prop({default:new Date()})
  createdAt:Date
}

export const TopicSchema = SchemaFactory.createForClass(Topic);

