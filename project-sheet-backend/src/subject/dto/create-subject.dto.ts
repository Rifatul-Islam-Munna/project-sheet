import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: '65cfd79e08df8b001eab1234', description: 'Reference to the Class ID' })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  classId: string;
  @ApiProperty({ example: 'class-8', description: 'Reference to the Class ID' })
  @IsString()
  @IsNotEmpty()
  
  className: string;

  @ApiProperty({ example: 'Mathematics', description: 'Subject Name' })
  @IsString()
  @IsNotEmpty()
  subjectName: string;

  @ApiPropertyOptional({ example: 5, description: 'Number of Topics' })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  Topic?: number;

  @ApiPropertyOptional({ example: 10, description: 'Number of Subtopics' })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  subTopic?: number;

  @ApiPropertyOptional({ example: 60, description: 'Time spent on subject (in minutes)' })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  time?: number;

  @ApiPropertyOptional({ example: new Date().toISOString(), description: 'Creation Date' })
  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
export class QuerySubjectDto {
    @ApiPropertyOptional({ example: '65cfd79e08df8b001eab1234', description: 'Subject ID' })
    @IsString()
    @IsOptional()
    @IsMongoId()
    id?: string;
    @ApiPropertyOptional({ example: 'class-8', description: 'Reference to the Class ID' })
    @IsString()
    @IsOptional()
    
    className?: string;
  }
  export class UpdateNumberDto {
    @ApiProperty({ 
      example: '65cfd79e08df8b001eab1234', 
      description: 'Subject ID' 
    })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    id: string;
  
    @ApiPropertyOptional({ 
      example: true, 
      description: 'Set to true to increment the Topic count' 
    })
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    isTopic?: boolean;
  
    @ApiPropertyOptional({ 
      example: true, 
      description: 'Set to true to increment the SubTopic count' 
    })
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    isSubTopic?: boolean;
  
    @ApiPropertyOptional({ 
      example: true, 
      description: 'Set to true to decrease instead of increase' 
    })
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    isDecries?: boolean;
    @ApiPropertyOptional({ 
      example: true, 
      description: 'Set to true to decrease instead of increase' 
    })
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    isWhole?:boolean
    @ApiPropertyOptional({ 
      example: 10, 
      description: 'Set to true to decrease instead of increase' 
    })
    @IsBoolean()
    @Transform(({ value }) => Number( value) )
    @IsOptional()
    lengthOfSubTopic?:number

  }
export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
    @ApiProperty({ example: '65cfd79e08df8b001eab1234', description: 'Subject ID' })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    id: string;
}