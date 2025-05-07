import { HttpException, Injectable } from '@nestjs/common';
import { ContentDto,QueryIdDto,UpdateContentDto } from './dto/create-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentDocument } from './entities/content.schema';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name)
  constructor(@InjectModel(Content.name) private readonly contentModel:Model<ContentDocument>){}
  async create(createContentDto: ContentDto) {
    const c = await this.contentModel.create(createContentDto);
    if(!c){
      throw new HttpException('Content not created', 400);
    }
    return{message:"Content created successfully",data:c}
  }
 async update(upda:UpdateContentDto){
   const k = await this.contentModel.findOneAndUpdate({_id:upda.id},upda,{new:true,upsert:true}).lean();
   if(!k){
     throw new HttpException('Content not updated', 400);
   }
   return{
     message:"Content updated successfully",
     data:k
   }
 }
 async remove(id: QueryIdDto) {
   const k = await this.contentModel.findByIdAndDelete(id.id).lean();
   if(!k){
     throw new HttpException('Content not deleted', 400);
   }
   return{
     message:"Content deleted successfully",
     data:k
   }
 }
 async finOne(id: QueryIdDto) {
  this.logger.log("calling find",id)
  const query:Record<string,any> = {...(id.id && {subTopicId:id.id}), ...(id.isForPreview && {isPreview:true})}; 
  const k = await this.contentModel.findOne(query).lean();
   

   if(!k){
     throw new HttpException('Content not found', 400);
   }
   return{
     message:"Content found successfully",
   
     data:k
   }
 }
 async findForPreview(){
  this.logger.log("calling for preview find")
 const k = await this.contentModel.findOne({isPreview:true}).lean() ?? await this.contentModel.findOne().lean();

return{
  message:"Content found successfully",

  data:k
}

 }
 
}
