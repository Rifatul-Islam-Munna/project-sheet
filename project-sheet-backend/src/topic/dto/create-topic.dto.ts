import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class SubTopicDto {
  @ApiProperty({ example: 'Introduction to Algebra' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'ALG-001' })
  @IsString()
  @IsOptional()
  key?: string;
}

export class TopicDto {
  @ApiProperty({ example: '65cfd79e08df8b001eab1234', description: 'Reference to the Class ID' })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ example: 'Algebra', description: 'Name of the topic' })
  @IsString()
  @IsNotEmpty()
  topicName: string;

  @ApiPropertyOptional({ type: [SubTopicDto], description: 'List of subtopics' })
  @IsArray()
  @IsOptional()
  SubTopic?: SubTopicDto[];

  @ApiPropertyOptional({ example: new Date().toISOString(), description: 'Creation date' })
  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
export class UpdateTopicDto extends PartialType(TopicDto) {
    @ApiProperty({ example: '65cfd79e08df8b001eab1234', description: 'Reference to the Class ID',required:true })
    @IsMongoId()
    @IsString()
    @IsOptional()
    id:string
}

export class QueryTopic{
    @ApiProperty({ example: '65cfd79e08df8b001eab1234', description: 'Reference to the Class ID' })
    @IsMongoId()
    @IsString()
    id:string
}