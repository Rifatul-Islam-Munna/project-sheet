
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SubTopic } from 'src/topic/entities/topic.schema';

export type ContentDocument = HydratedDocument<Content>;

@Schema({timestamps:true})
export class Content {
 @Prop({required:true,ref:SubTopic.name, type:mongoose.Schema.Types.ObjectId})
 subTopicId: string;

   @Prop()
  description: string;
  @Prop({default:false})
  isPreview:boolean
  @Prop({default:new Date()})
  createdAt:Date
}

export const ContentSchema = SchemaFactory.createForClass(Content);

