import {
    Catch,
    ArgumentsHost,
    Logger,
    Injectable,
    HttpException,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {RuntimeException} from "@nestjs/core/errors/exceptions/runtime.exception";

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
    constructor(
    ) {
        super();
    }
    private readonly logger = new Logger(ExceptionsFilter.name);

    async catch(exception: RuntimeException, host: ArgumentsHost) {

        const req = host.switchToHttp().getRequest();
        const res = host.switchToHttp().getResponse();

        const message = exception.message;
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            if (exception instanceof UnauthorizedException) {

            }
            else if (exception instanceof InternalServerErrorException) {
                this.logger.error(`[${req.no}] ${Date.now() - req.now}ms ${status} : ${message}`)
            }
            else {
                this.logger.log(`[${req.no}] ${Date.now() - req.now}ms ${status} : ${message}`);
            }
        }
        else {
            this.logger.error(`[${req.no}] ${Date.now() - req.now}ms ${message}`);
        }

        super.catch(exception, host);
    }

    getExceptionMessage(request: any, exception: any) {
        if (request.body != undefined) {
            return `[${request.no}] ${request.method} ${request.url} ${JSON.stringify(request.user)} \n${JSON.stringify(request.body)}\n${exception.message}`
        } else {
            return `[${request.no}] ${request.method} ${request.url} ${JSON.stringify(request.user)} \n${exception.message}`
        }
        
        // if (exception.name == 'QueryFailedError') {
        //     return `[${request.no}] ${request.method} ${request.url} BODY:${request.body}\n${exception.message}\n${exception.sql}`
        // } else {
        //     return `[${request.no}] ${request.method} ${request.url} BODY:${request.body}\n${exception.message}`
        // }
    }
}