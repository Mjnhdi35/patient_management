import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    const pool = new PrismaPg({
      connectionString: process.env['DATABASE_URL']!,
    });
    super({ adapter: pool });
  }
  async onModuleInit() {
    this.logger.log('Connecting to database');
    const start = Date.now();
    try {
      await this.$connect();
      const ms = Date.now() - start;
      this.logger.log(`Database connected successfully ${ms}ms`);
    } catch (error) {
      this.logger.error('Fail to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from database');
    try {
      await this.$disconnect();
      this.logger.log('Database connection closed');
    } catch (error) {
      this.logger.error('Fail to disconnect from database', error);
    }
  }
}
