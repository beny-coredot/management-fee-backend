import { Module } from '@nestjs/common';
import { AdministerController } from './administer.controller';
import { AdministerService } from './administer.service';

@Module({
  controllers: [AdministerController],
  providers: [AdministerService]
})
export class AdministerModule {}
