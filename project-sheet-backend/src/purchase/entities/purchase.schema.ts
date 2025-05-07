
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.schema';
import { Subject } from 'src/subject/entities/subject.schema';
export type PurchaseDocument = HydratedDocument<Purchase>;
@Schema({timestamps:true})
export class Purchase {
 @Prop({ref:User.name, type:mongoose.Schema.Types.ObjectId,required:true})
 userId:string

 @Prop({ref:Subject.name, type:mongoose.Schema.Types.ObjectId,required:true})
 subjectId:string

}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
