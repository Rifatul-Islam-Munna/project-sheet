import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateSubjectDto,QuerySubjectDto,UpdateNumberDto,UpdateSubjectDto } from './dto/create-subject.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Subject,SubjectDocument } from './entities/subject.schema';
import { Model } from 'mongoose';



@Injectable()

export class SubjectService {
   private readonly logger = new Logger(SubjectService.name);
  constructor(@InjectModel(Subject.name) private readonly subjectModel:Model<SubjectDocument>) {}
  async create(createSubjectDto: CreateSubjectDto) {
    const subject =  await this.subjectModel.create(createSubjectDto);
    if(!subject){
      throw new HttpException('Subject not created', 400);
    }
    return{message:"Subject created successfully",data:subject}
  }

  

 async find(id: QuerySubjectDto) {
  this.logger.log("calling find")
  const query = {...(id.id && {classId:id.id}),...(id.className && {className:id.className})};
    const find = await this.subjectModel.find(query).select("subjectName Topic subTopic time className").lean();
    if(!find.length){
      throw new HttpException('Subject not found', 400);
    }
    return{message:"Subject found successfully",data:find}
  }
  
  async update(up:UpdateSubjectDto){
    const k = await this.subjectModel.findOneAndUpdate({_id:up.id},up,{new:true,upsert:true});
    if(!k){
      throw new HttpException('Subject not updated', 400);
    }
    return{
      message:"Subject updated successfully",
      data:k
    }
  }

  async remove(id: QuerySubjectDto) {
    const k = await this.subjectModel.findByIdAndDelete(id.id);
    if(!k){
      throw new HttpException('Subject not deleted', 400);
    }
    return{
      message:"Subject deleted successfully",
      data:k
    }
  }
  async finAndUpdateNumbers(u: UpdateNumberDto) {
    
    const updateFields: Record<string, number> = {};
  
   
    if (u.isTopic) {
      updateFields.Topic = u.isDecries ? -1 : 1;
    }
  
  
    if (u.isSubTopic) {
      updateFields.subTopic = u.isDecries ? -1 : 1;
    }
  
    
    if (u.isSubTopic) {
      updateFields.time = u.isDecries ? -10 : 10;
    }
    if(u.isWhole){
      updateFields.Topic = -1;
      updateFields.subTopic = -(u.lengthOfSubTopic ?? 0);
      updateFields.time = -(u.lengthOfSubTopic ?? 0)*10;
    }
  
    // Perform the update
    const updatedSubject = await this.subjectModel.findOneAndUpdate(
      { _id: u.id },
      { $inc: updateFields },
      { new: true, upsert: true }
    );
  
    
    if (!updatedSubject) {
      throw new HttpException('Subject not updated', 400);
    }
  
  
    return {
      message: "Subject updated successfully",
      data: updatedSubject
    };
  }
  

  
}
