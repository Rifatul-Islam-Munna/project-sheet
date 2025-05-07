import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadServiceService } from './upload-service.service';
import { CreateUploadServiceDto } from './dto/create-upload-service.dto';
import { UpdateUploadServiceDto } from './dto/update-upload-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('upload-service')
@ApiTags('upload-service')
export class UploadServiceController {
  constructor(private readonly uploadServiceService: UploadServiceService) {}

  @Post("upload-image")
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:"./uploads",
      filename:(req,file,cb)=>{
        cb(null,Date.now() + "-" + file.originalname);
      }
    })
  }))
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file format' })
  create(@UploadedFile() file:Express.Multer.File) {
    return this.uploadServiceService.create(file);
  }

  
}
