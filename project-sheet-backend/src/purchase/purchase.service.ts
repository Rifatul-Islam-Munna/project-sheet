import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase, PurchaseDocument } from './entities/purchase.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PurchaseService { 
  constructor(@InjectModel(Purchase.name) private  PurchaseModel:Model<PurchaseDocument> ) {}  
  
  async create(createPurchaseDto: CreatePurchaseDto,id:string) {
  if(!id){
    throw new Error("You are not logged in");
  }
    const isItAlreadyThere  = await this.PurchaseModel.findOne({userId:id,subjectId:createPurchaseDto.subjectId}).lean();
    if(isItAlreadyThere){
      throw new Error("You have already purchased this subject");
    }
    const k = await this.PurchaseModel.create({userId:id,subjectId:createPurchaseDto.subjectId});
    return k
    

  }

   async findAll(id:string) {
    const findAll = await this.PurchaseModel.find({userId:id}).populate("subjectId").lean();
    if(findAll.length === 0){
      throw new Error("You have not purchased any subject");
    }
   const k = findAll.map((item) => item.subjectId)
    return{
      message:"Purchased Subjects found successfully",
      data:k
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
