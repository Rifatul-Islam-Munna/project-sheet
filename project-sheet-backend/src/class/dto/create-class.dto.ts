import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Division } from '../entities/class.schema';

export class CreateClassDto {
  @ApiProperty({
    description: 'URL of the class image',
    type: String,
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Title of the class',
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the class',
    type: String,
  })
  @IsString()
  desc: string;

  @ApiProperty({
    description: 'Name of the class',
    type: String,
  })
  @IsString()
  className: string;

  @ApiProperty({
    description: 'Base for the class',
    type: String,
  })
  @IsString()
  base: string;
  @ApiPropertyOptional({
    description: 'Base for the class',
    type: String,
    enum:Division
  })
  @IsString()
  @IsOptional()
  division: Division.Science;

  @ApiPropertyOptional({
    description: 'Base for the class',
    type: String,
    
  })
  @IsString()
  @IsOptional()
  subject: string;
  @ApiPropertyOptional({
    description: 'year',
    type: String,
    
  })
  @IsString()
  @IsOptional()
  year: string;
}

export class QueryDto {
    @ApiPropertyOptional({
      description: 'Flag to indicate if it is for the card',
      type: Boolean,
      default: false,
    })
    @Transform(({ value }) => value === 'true') // Transform 'true'/'false' strings to boolean
    @IsBoolean()
    @IsOptional()
    isForCard: boolean;
  
    @ApiPropertyOptional({
      description: 'Flag to indicate if it is for selection',
      type: Boolean,
      default: false,
    })
    @Transform(({ value }) => value === 'true') // Transform 'true'/'false' strings to boolean
    @IsBoolean()
    @IsOptional()
    isForSelect: boolean;
    @ApiPropertyOptional({
      description: 'it will send back all the subject name',
      type: Boolean,
      default: false,
    })
    @Transform(({ value }) => value === 'true') // Transform 'true'/'false' strings to boolean
    @IsBoolean()
    @IsOptional()
    isForUniversity: boolean;
  
    @ApiPropertyOptional({
      description: 'The name of the class',
      type: String,
      default: '',
    })
    @IsString()
    @IsOptional()
    ClassName: string;
    @ApiPropertyOptional({
      description: 'Base for the class',
      type: String,
      enum:Division
    })
    @IsString()
    @IsOptional()
    division: Division.Science;
    @ApiPropertyOptional({
      description: 'Base for the class',
      type: String,
      
    })
    @IsString()
    @IsOptional()
    subject: string;
    @ApiPropertyOptional({
      description: 'year',
      type: String,
      
    })
    @IsString()
    @IsOptional()
    year: string;

    @ApiPropertyOptional({
      description: 'Base for the class example school,collage,university',
      type: String,
    
    })
    @IsString()
    @IsOptional()
    base: string;
  }

  export class DeleteDto{
    @ApiProperty({
        description: 'mongodb id',
        type: String,
      })
    @IsMongoId()
    @IsString()
    id:string
  }
export class UpdateClassDto extends PartialType(CreateClassDto) {
    @ApiProperty({
        description: 'mongodb id',
        type: String,
      })
    @IsMongoId()
    @IsString()
    id:string
}
