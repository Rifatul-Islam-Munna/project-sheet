import { HttpException, Injectable } from '@nestjs/common';
import { TopicDto,QueryTopic,UpdateTopicDto } from './dto/create-topic.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Topic,TopicDocument } from './entities/topic.schema';
import { Model } from 'mongoose';
import { SubjectService } from 'src/subject/subject.service';

@Injectable()
export class TopicService {
  constructor(@InjectModel(Topic.name) private readonly topicModel:Model<TopicDocument>,private readonly subjectService:SubjectService){}
  async create(createTopicDto: TopicDto) {
    const createdTopic = await this.topicModel.create(createTopicDto);
    if(!createdTopic){
      throw new HttpException('Topic not created', 400);
    }
    await this.subjectService.finAndUpdateNumbers({id:createTopicDto.subjectId,isTopic:true,isDecries:false})
    return {
      message:"Topic created successfully",
      data:createdTopic
    }
  }
  async findAll(q:QueryTopic) {
    const topics = await this.topicModel.find({subjectId:q.id}).select("topicName SubTopic").lean();
    if(!topics.length){
      throw new HttpException('Topic not found', 400);
    }
    return {
      message:"Topic found successfully",
      data:topics
    }
  }
  async Update(u:UpdateTopicDto){
    const findOne = await this.topicModel.findOne({_id:u.id}).lean();
    if(!findOne){
      throw new HttpException('Topic not found', 400);
     }
     if( u.SubTopic?.length && u.SubTopic?.length  >findOne.SubTopic.length ){
      await this.subjectService.finAndUpdateNumbers({id:findOne.subjectId,isSubTopic:true,isDecries:false})
    }
    if( u.SubTopic?.length && u.SubTopic?.length  < findOne.SubTopic.length ){
      await this.subjectService.finAndUpdateNumbers({id:findOne.subjectId,isSubTopic:true,isDecries:true})
    }

    const k = await this.topicModel.findOneAndUpdate({_id:u.id},u,{new:true,upsert:true});
    if(!k){
      throw new HttpException('Topic not updated', 400);
     }
    
    return{
     message:"Topic updated successfully",
     data:k
    }
  }
  async Delete(U:QueryTopic){
    const findOne = await this.topicModel.findOne({_id:U.id}).lean();
    if(!findOne){
      throw new HttpException('Topic not deleted', 400);
    }
     this.subjectService.finAndUpdateNumbers({id:findOne.subjectId,isWhole:true,lengthOfSubTopic:findOne.SubTopic.length})
    const k = await this.topicModel.findByIdAndDelete(U.id);
    if(!k){
      throw new HttpException('Topic not deleted', 400);
    }
    return{
      message:"Topic deleted successfully",
      data:k
    }
  }
 
}
