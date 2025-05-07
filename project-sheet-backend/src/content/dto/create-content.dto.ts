import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsMongoId, IsBoolean, IsOptional, IsDate } from 'class-validator';

export class ContentDto {
  @ApiProperty({
    example: '60b7d8f9e3cfcf1c2e6b8f6d',
    description: 'The ID of the SubTopic associated with the Content.',
  })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  subTopicId: string;

  @ApiProperty({
    example: 'Detailed description of the content.',
    description: 'Description of the content.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates if the content is a preview.',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
   
    if (typeof value === 'string') {
      return value === 'true';
    }
    return !!value;  
  })
  @IsOptional()
  isPreview: boolean;

 
}
export class QueryIdDto {
    @ApiProperty({
      example: '60b7d8f9e3cfcf1c2e6b8f6d',
      description: 'The ID of the content that we want to query.',
    })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    id: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Indicates if the content is a preview.',
      })
      @IsBoolean()
      @IsNotEmpty()
      @Transform(({ value }) => {
       
        if (typeof value === 'string') {
          return value === 'true';
        }
        return !!value;  
      })
      @IsOptional()
      isForPreview: boolean;
  }

  export class UpdateContentDto extends PartialType(ContentDto) {
    @ApiProperty({
        example: '60b7d8f9e3cfcf1c2e6b8f6d',
        description: 'The ID of the content that we want to query.',
      })
      @IsString()
      @IsNotEmpty()
      @IsMongoId()
      id: string;
  }