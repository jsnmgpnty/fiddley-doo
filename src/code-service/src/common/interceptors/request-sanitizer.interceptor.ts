import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import * as rawbody from 'raw-body';

@Injectable()
export class RequestSanitizerInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    if (!request || !response) return next.handle();
    const type = request.method;
    if (type.toLowerCase() !== 'post' || !request.body) return next.handle();
    if (typeof request.body === 'string') {
      request.body = JSON.parse(request.body);
      return next.handle();
    }

    if (request.readable && !this.isMultipartFormData(request)) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(request);
      const text = raw.toString().trim();
      request.body = JSON.parse(text);
    }
    return next.handle();
  }

  private isMultipartFormData (req: Request): boolean {
    if (!req || !req.headers) return false;
    return req.headers['content-type'].includes('multipart/form-data');
  }
}
