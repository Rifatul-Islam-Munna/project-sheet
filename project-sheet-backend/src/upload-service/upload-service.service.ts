import { Injectable } from '@nestjs/common';
import { CreateUploadServiceDto } from './dto/create-upload-service.dto';
import { UpdateUploadServiceDto } from './dto/update-upload-service.dto';
import * as path from 'path';
import * as fs from 'fs';
import { v2 as cloudinary } from 'cloudinary'

@Injectable()
export class UploadServiceService {
  private uploaderFile = path.join(__dirname, '/uploads');
  constructor() {
    if (!fs.existsSync(this.uploaderFile)) {
      fs.mkdirSync(this.uploaderFile, { recursive: true });
    }
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.Api_secrate,
    });
  }
  async create(file:Express.Multer.File) {
    const files =  await cloudinary.uploader.upload(file.path,{
      folder:"test",
      width: 600, 
      height: 600, 
      crop: 'limit', 
      quality: 'auto:good', 
      format: 'avif', 
    })
    fs.unlinkSync(file.path);
    return {
      url:files.secure_url
    }
  }

 

 
}
