import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto ,QueryDto,UpdateClassDto,DeleteDto} from './dto/create-class.dto';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.schema';
@Controller('class')
@ApiTags("class")
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }



 @Get("get-all")
  findAll(@Query() query: QueryDto) {
    return this.classService.findAll(query);
  }
  @Patch()
  UpdateOne (@Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(updateClassDto);
  }
  @Delete(":id")
  remove(@Param('id') id:DeleteDto ) {
    return this.classService.remove(id);
  }
 
}
