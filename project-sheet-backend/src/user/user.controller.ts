import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto,LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard, ExpressRequest } from 'src/auth/auth.guard';

@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
 @Post('login')
  async login(@Body() lgins: LoginUserDto,@Res() res:Response) {
    const k = await this.userService.LogInUser(lgins);
    
    const expires = new Date();
 

expires.setDate(expires.getDate() + 6);

res.cookie("access_token", k.access_token, {
  maxAge: 1000*60*60*24*10, 
  sameSite:"none",

  
       
});
res.cookie("refresh_token", k.refresh_token, {
  maxAge: 1000*60*60*24*20,
  sameSite:"none",
})

res.status(200).json(k)
  }
 
 @Get()
 @UseGuards(AuthGuard)
 findMyUSer(@Req() req:ExpressRequest){
   return this.userService.findMyUSer(req?.user?.id);
 }  



}
