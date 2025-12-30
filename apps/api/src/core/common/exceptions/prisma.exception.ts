import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { ApiResponse } from '../types/res-api.type';
import { extractConstraintError } from '../utils/prisma-error.util';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientUnknownRequestError,
  HttpException,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(error: unknown): never {
    if (error instanceof HttpException) {
      throw error;
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new HttpException(
        this.buildErrorResponse(HttpStatus.BAD_REQUEST, 'Invalid request data'),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const meta = extractConstraintError(error.meta);

      throw new HttpException(
        this.buildErrorResponse(
          HttpStatus.CONFLICT,
          'Database constraint error',
          error.code,
          meta,
        ),
        HttpStatus.CONFLICT,
      );
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
        this.buildErrorResponse(
          HttpStatus.SERVICE_UNAVAILABLE,
          'Database unavailable',
        ),
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    this.logger.error('Unknown Prisma error', error as Error);
    throw new HttpException(
      this.buildErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal server error',
      ),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private buildErrorResponse(
    statusCode: number,
    message: string,
    code?: string,
    meta?: unknown,
  ): ApiResponse<never> {
    return {
      success: false,
      statusCode,
      error: { message, code, meta },
      timestamp: new Date().toISOString(),
    };
  }
}
