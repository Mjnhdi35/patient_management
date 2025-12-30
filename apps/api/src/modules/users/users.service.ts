import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(body: CreateUserDto) {
    const { password, ...data } = body;

    if (!password) {
      throw new BadRequestException('Error');
    }

    return await this.prisma.user.create({
      data: {
        password: await hash(
          password,
          +this.configService.getOrThrow<number>('SALT'),
        ),
        ...data,
      },
    });
  }
}
