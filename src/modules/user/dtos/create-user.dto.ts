import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
    required: true,
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'The password for the user account. Must be at least 8 characters long.',
    example: 'password123',
    minLength: 8,
    required: true,
  })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
