import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, QuerySubjectDto,UpdateSubjectDto } from './dto/create-subject.dto';
import { AuthGuard } from 'src/auth/auth.guard';



@Controller('subject')
@UseGuards(AuthGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  findAll(@Query() query:QuerySubjectDto) {
    return this.subjectService.find(query);
  }
  @Patch()
  update(@Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(updateSubjectDto);
  }
 @Delete()
 Delete(@Query() id:QuerySubjectDto){
  return this.subjectService.remove(id)
 }
 
}
