import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto,QueryIdDto,UpdateContentDto } from './dto/create-content.dto';


@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Body() createContentDto: ContentDto) {
    return this.contentService.create(createContentDto);
  }

 @Patch()
  update(@Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(updateContentDto);
  }
  @Get('all')
  findOne(@Query() query:QueryIdDto) {
    return this.contentService.finOne(query);
  }
  @Get("get-for-preview")
  findPreview() {
    return this.contentService.findForPreview();
  }
  @Delete()
  remove(@Query() query:QueryIdDto) {
    return this.contentService.remove(query);
  }
}
