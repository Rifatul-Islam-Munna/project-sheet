import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto,LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User,UserDocument } from './entities/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>,
  private jwtService: JwtService
) {}
 async  create(createUserDto: CreateUserDto) {
  const existingUser = await this.userModel.findOne({email:createUserDto.email});
  if(existingUser){
    throw new HttpException('User already exists', 400);
  }
  const {password,...rest} = createUserDto;
  const hash = await bcrypt.hash(password, 10);
  const payload ={
    ...rest,
    password:hash
  }
   const user = await this.userModel.create(payload);
   if(!user){
    throw new HttpException('User not created', 400); 
   }
   return{
    message:'User created successfully',
    user
   }

  }

  async LogInUser (login:LoginUserDto){
    const user = await this.userModel.findOne({email:login.email});
    if(!user){
      throw new HttpException('User not found', 400);
    }
    const isMatch = await bcrypt.compare(login.password,user.password);
    if(!isMatch){
      throw new HttpException('Invalid credentials', 400);
    }
    const access_token = this.jwtService.sign({email:user.email,id:user._id,role:user.role},{expiresIn:"5d",secret:process.env.ACCESS_TOKEN});
    const refresh_token = this.jwtService.sign({email:user.email,id:user._id,role:user.role},{expiresIn:"30d",secret:process.env.REFRESH_TOKEN});
    return{
      message:'User logged in successfully',
      access_token,
      refresh_token
    }
  }
  async updateUser (id:string,updateUserDto:UpdateUserDto){
    const user = await this.userModel.findOne({email:updateUserDto.email});
    if(user){
      throw new HttpException('User already exists', 400);
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true,upsert:true});
    if(!updatedUser){
      throw new HttpException('User not updated', 400);
    }
    return{
      message:'User updated successfully',
      updatedUser
    }
  }
  async findMyUSer (id:string){
   const findUser = await this.userModel.findById(id).lean();
   if(!findUser){
    throw new HttpException('User not found', 400);
   }
   return{
    message:'User found successfully',
    findUser
   }
  }
 
}

