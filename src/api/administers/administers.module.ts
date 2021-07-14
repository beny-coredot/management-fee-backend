import { Module } from '@nestjs/common';
import { AdministersController } from './administers.controller';
import { AdministersService } from './administers.service';

@Module({
  controllers: [AdministersController],
  providers: [AdministersService]
})
export class AdministersModule {}
