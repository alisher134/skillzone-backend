import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The file path to the user’s avatar image.',
    example: '/uploads/avatars/avatar1.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly avatarPath: string;
}
