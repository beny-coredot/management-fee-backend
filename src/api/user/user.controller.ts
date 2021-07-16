import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserJoinDTO } from './dto/user.join.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterBuildingDto } from './dto/user.register.building';
import { User } from './entities/user.entity';
import { Payload, UserAuth } from './user.decorator';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
    
    constructor(
        private readonly usersService: UserService
    ) {}



    @ApiOperation({summary: '유저 가입'})
    @ApiResponse({status: 400, description: '기존 유저가 있음'})
    @Post('join')
    join(@Body() dto: UserJoinDTO) {
        return this.usersService.join(dto);
    }

    @ApiOperation({summary: '유저 로그인 (토큰 발급)'})
    @ApiResponse({status: 404, description: '유저 정보가 없음'})
    @Post('login')
    login(@Body() dto: UserLoginDto) {
        return this.usersService.login(dto);
    }

    @ApiOperation({summary: '유저 정보 조회'})
    @Get('')
    getUser(@Payload() payload) {
        return this.usersService.getUser(payload);
    }
    
    @ApiOperation({summary: '빌딩 등록'})
    @ApiResponse({status: 404, description: '건물 정보가 없음'})
    @Post('building/register')
    registerBuilding(@Payload() payload, @Body() dto: UserRegisterBuildingDto) {
        return this.usersService.registerBuilding(payload, dto);
    }

    @ApiOperation({summary: '유저 홈 정보 조회'})
    @Get('home')
    getUserHome(@Payload() payload) {
        return this.usersService.getUserHome(payload);
    }


}
