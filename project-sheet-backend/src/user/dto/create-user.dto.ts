import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.schema';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email', uniqueItems: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+1234567890', description: 'User phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '10th Grade', description: 'User class', required: false })
  @IsOptional()
  @IsString()
  class?: string;
  @ApiProperty({ example: 'password', description: 'password' })
  
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ example: 'user', description: 'User role', enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class LoginUserDto {
    @ApiProperty({
      description: 'The email of the user',
      example: 'user@example.com',
    })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @ApiProperty({
      description: 'The password of the user',
      example: 'Password123!',
    })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
  }

export class UpdateUserDto extends PartialType(CreateUserDto){}