import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic,TopicSchema } from './entities/topic.schema';
import { SubjectModule } from 'src/subject/subject.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),SubjectModule],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
