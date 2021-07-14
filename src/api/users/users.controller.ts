import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('api/v1/users')
export class UsersController {
    
    constructor(
        private readonly usersService: UsersService
    ) {}

    @ApiOperation({description: '조회', summary: '유저 조회'})
    @Get('')
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
