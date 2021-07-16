import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthJwtService } from 'src/authorization/auth.jwt.service';
import { PublicDataService } from 'src/service/public.data.service';
import { Repository } from 'typeorm';
import { UserJoinDTO } from './dto/user.join.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterBuildingDto } from './dto/user.register.building';
import { User } from './entities/user.entity';
import { UserPayload } from './user.payload';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly authJwtService: AuthJwtService,
        private readonly publicDataService: PublicDataService,

        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
    ) {}
    
    async join(dto: UserJoinDTO) {

        let user = await this.userRepository.findOne({where: {name: dto.name, phone: dto.phone}});
        if (user != undefined) {
            throw new BadRequestException('Duplicate user');
        }

        user = new User();
        user.name = dto.name;
        user.phone = dto.phone;
        user.kakaoId = dto.kakaoId;
        user.profile = dto.profile;
        user.email = dto.email;

        return await this.userRepository.save(user);
    }

    async login(dto: UserLoginDto) {

        const user = await this.userRepository.findOne({where: {name: dto.name, phone: dto.phone}});
        if (user == undefined) {
            throw new NotFoundException('Not found user');
        }

        const payload = {
            id: user.id,
            name: user.name,
            phone: user.phone,
        } as UserPayload;
        
        return this.authJwtService.createJWT(payload);
    }

    async getUser(payload: UserPayload) {

        return await this.userRepository.findOne({id: payload.id});
    }

    async registerBuilding(payload: UserPayload, dto: UserRegisterBuildingDto) {

        const user = await this.userRepository.findOne({id: payload.id});



    }

    async getUserHome(payload: UserPayload) {

        const userBuilding = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.buildingResidents', 'buildingResidents')
            .leftJoinAndSelect('buildingResidents.building', 'building')
            .where('user.id = :id', {id: payload.id})
            .getOne();

        // 관리비 

        // 공지



        return {
            userBuilding: userBuilding
        }
    }
    
}
