import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserJoinDTO } from './dto/user.join.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { BuildingDto } from './dto/building.dto';
import { User } from './entities/user.entity';
import { Payload, UserAuth } from './user.decorator';
import { UserService } from './user.service';
import { BuildingRequestDto } from './dto/building.request.dto';
import { UserPayload } from './user.payload';
import { IdParams } from 'src/common/id.params';
import { BuildingAddResidentDto } from './dto/building.add.resident.dto';
import { BuildingAddRepresentDto } from './dto/building.add.represent.dto';
import { BuildingRemoveResidentDto } from './dto/building.remove.resident.dto';
import { BuildingConfirmResidentDto as BuildingConfirmResidentDto } from './dto/building.confrim.resident.dto';

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

    @ApiOperation({summary: '유저 정보 조회', description: '정보 조회 시 입주자 대표가 추가한 입주자로의 매핑이 필요한 경우를 알려줌'})
    @UserAuth()
    @Get('')
    getUser(@Payload() payload: UserPayload) {
        return this.usersService.getUser(payload);
    }

    @ApiOperation({summary: '등록된 건물 조회'})
    @ApiResponse({status: 404, description: '해당 주소의 등록된 건물이 없음'})
    @Get('building')
    findBuilding(@Payload() payload: UserPayload, @Query() dto: BuildingDto) {
        return this.usersService.findBuilding(payload, dto);
    }

    @ApiOperation({summary: '건물 등록'})
    @ApiResponse({status: 400, description: '공공 api 응답 해더가 잘못됨'})
    @Post('building')
    createBuilding(@Payload() payload: UserPayload, @Body() dto: BuildingDto) {
        return this.usersService.createBuilding(payload, dto);
    }

    @ApiOperation({summary: '건물 등록 요청'})
    @UserAuth()
    @Post('building/request')
    requestBuilding(@Payload() payload: UserPayload, @Body() dto: BuildingRequestDto) {
        return this.usersService.requestBuilding(payload, dto);
    }

    @ApiOperation({summary: '건물 입주자 대표로 등록'})
    @Post('building/:id/represent')
    addRepresentInBuilding(@Payload() payload: UserPayload, @Param() params: IdParams, @Body() dto: BuildingAddRepresentDto) {
        return this.usersService.addRepresentInBuilding(payload, params.id, dto);
    }

    @ApiOperation({summary: '건물 입주자 추가 (입주자 대표만 추가 가능)'})
    @Post('building/:id/resident')
    addResidentInBuilding(@Payload() payload: UserPayload, @Param() params: IdParams, @Body() dto: BuildingAddResidentDto) {
        return this.usersService.addResidentInBuilding(payload, params.id, dto);
    }

    @ApiOperation({summary: '건물 입주자 삭제 (입주자 대표만 삭제 가능)'})
    @Delete('building/:id/resident')
    deleteResidentInBuilding(@Payload() payload: UserPayload, @Param() params: IdParams, @Body() dto: BuildingRemoveResidentDto) {
        return this.usersService.deleteResidentInBuilding(payload, params.id, dto);
    }

    @ApiOperation({summary: '건물 입주자 등록 체크 (입주자 확인)'})
    @Post('building/:id/resident/confirm')
    confirmResidentInBuilding(@Payload() payload: UserPayload, @Param() params: IdParams, @Body() dto: BuildingConfirmResidentDto) {
        return this.usersService.confirmResidentInBuilding(payload, params.id, dto);
    }

    @ApiOperation({summary: '유저 홈 정보 조회'})
    @Get('home')
    getUserHome(@Payload() payload) {
        return this.usersService.getUserHome(payload);
    }


}
