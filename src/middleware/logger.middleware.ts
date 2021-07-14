import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RandomUtil } from 'src/util/random.util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        (req as any).no = RandomUtil.getRandomStringValue(8);
        (req as any).now = Date.now();

        next();
    }
}
