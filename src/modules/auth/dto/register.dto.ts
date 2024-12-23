import { PickType } from '@nestjs/mapped-types';

import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

export class RegisterDto extends PickType(CreateUserDto, ['email', 'username', 'password']) {}
