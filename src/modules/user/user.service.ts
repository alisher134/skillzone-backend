import { Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '@prisma/client';
import { hash } from 'argon2';

import { PrismaService } from '@modules/prisma/prisma.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: await hash(createUserDto.password),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: string): Promise<User> {
    await this.findOneById(id);
    return await this.prismaService.user.delete({ where: { id } });
  }
}
