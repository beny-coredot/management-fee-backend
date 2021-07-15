import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserAuth } from './user.decorator';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
    
    constructor(
        private readonly usersService: UserService
    ) {}


    @ApiOperation({description: '로그인', summary: '유저 조회'})
    @Post('login')
    login(): Promise<string> {
        return this.usersService.login();
    }

    @ApiOperation({description: '조회', summary: '유저 조회'})
    @UserAuth()
    @Get('')
    find(): Promise<any> {
        return this.usersService.findOne();
    }

    @ApiOperation({description: '조회', summary: '유저 조회'})
    @Get('all')
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
