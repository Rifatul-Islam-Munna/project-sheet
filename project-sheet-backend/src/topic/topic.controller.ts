import { Controller, Get, Post, Body, Patch,  Delete, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicDto,QueryTopic,UpdateTopicDto } from './dto/create-topic.dto';

import { ApiTags } from '@nestjs/swagger';

@Controller('topic')
@ApiTags('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  create(@Body() createTopicDto: TopicDto) {
    return this.topicService.create(createTopicDto);
  }
 @Patch()
 update(@Body() updateTopicDto: UpdateTopicDto) {
   return this.topicService.Update(updateTopicDto);
 }
 @Get()
 getAll (@Query() id:QueryTopic){
   return this.topicService.findAll(id)
 }
 @Delete()
 Delete (@Query() id:QueryTopic){
  return this.topicService.Delete(id)
}
}
