import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, DynamicModule } from '@nestjs/common';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { RequestSanitizerInterceptor } from './interceptors/request-sanitizer.interceptor';

@Module({ })
export class CommonModule {
  static register(): DynamicModule {
    return {
      module: CommonModule,
      providers: [
        { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor },
        { provide: APP_INTERCEPTOR, useClass: RequestSanitizerInterceptor },
      ]
    };
  }
}
