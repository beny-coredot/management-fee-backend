import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from "@nestjs/common";
import {catchError, tap} from "rxjs/operators";


@Injectable()
export class AspectLoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger(AspectLoggerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        this.logger.log(`[${req.no}] ${req.method} ${req.url} ${JSON.stringify(req.user)} BODY:${JSON.stringify(req.body)}`);

        if (req.method == 'GET') {
            return next
                .handle()
                .pipe(
                    tap(() => this.logger.log(`[${req.no}] ${req.url} ${Date.now() - req.now}ms ${res.statusCode}`)),
                );
        } else {
            return next
                .handle()
                .pipe(
                    tap((body) => this.logger.log(`[${req.no}] ${req.url} ${Date.now() - req.now}ms ${res.statusCode} BODY:${JSON.stringify(body)}`)),
                );
        }
    }
}