import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content ,ContentSchema} from './entities/content.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
