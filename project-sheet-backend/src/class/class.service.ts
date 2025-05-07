import { HttpException, Injectable, OnModuleInit, Query } from '@nestjs/common';
import { CreateClassDto, DeleteDto, QueryDto ,UpdateClassDto} from './dto/create-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class,ClassDocument } from './entities/class.schema';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
@Injectable()
export class ClassService  {
  private readonly logger = new Logger(Class.name);
  constructor(@InjectModel(Class.name) private readonly classModel:Model<ClassDocument>) {}
  
  async create(createClassDto: CreateClassDto) {
    const create_class = await this.classModel.create(createClassDto);
    if(!create_class){
      throw new HttpException('Class not created', 400);
    }
    return{
      message:"Class created successfully",
      data:create_class
    }
  }

  async findAll(query:QueryDto){
    if(query.isForCard){
    return this.findForCard(query)
    }
    if(query.isForSelect){
      return this.findForSelect(query)
    }
    if(query.isForUniversity){
      const k =  await this.classModel.distinct("subject").lean()
      return{
        message:"Class found successfully",
        data:k
      }
    }
  }
  async findForCard (query:QueryDto){
     this.logger.log(query)
    
    const querys:Record<string,any> = {...(query.ClassName && {className:query.ClassName}), ...(query.base && {base:query.base}), ...(query.division && {division:query.division}),  ...(query.subject && { subject: new RegExp(query.subject, 'i') }),  ...(query.year && { year: new RegExp(query.year, 'i') })};
    const classes = await this.classModel.find(querys).lean();
    if(!classes.length){
      throw new HttpException('Class not found', 400);
    }
    return {
      message:"Class found successfully",
      data:classes
    }
  }
  async findForSelect(query:QueryDto){
    if(!query.base){
      throw new HttpException('Class name is required', 400);
    }
    const classes = await this.classModel.find({base:query.base}).select("className  subject year division").lean();
    if(!classes.length){
      throw new HttpException('Class not found', 400);
    }
    return {
      message:"Class found successfully",
      data:classes
    }
  }
 async update(u:UpdateClassDto){
 const k = await this.classModel.findOneAndUpdate({_id:u.id},u,{new:true,upsert:true});
 if(!k){
  throw new HttpException('Class not updated', 400);
 }
 return{
  message:"Class updated successfully",
  data:k
 }
 }
  async remove(id: DeleteDto) {
    const k = await this.classModel.findByIdAndDelete(id.id);
    if(!k){
      throw new HttpException('Class not deleted', 400);
    }
    return{
      message:"Class deleted successfully",
      data:k
    }
  }
}
