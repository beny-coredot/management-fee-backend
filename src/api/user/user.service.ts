import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthJwtService } from 'src/authorization/auth.jwt.service';
import { PublicDataService } from 'src/service/public.data.service';
import { Connection, Repository } from 'typeorm';
import { UserJoinDTO } from './dto/user.join.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { BuildingDto } from './dto/building.dto';
import { User } from './entities/user.entity';
import { UserPayload } from './user.payload';
import { Building } from './entities/building.entity';
import { BuildingArea } from './entities/building.area.entity';
import { BuildingRequestDto } from './dto/building.request.dto';
import { BuildingRequest } from './entities/building.request.entity';
import { BuildingAddResidentDto } from './dto/building.add.resident.dto';
import { BuildingAddRepresentDto } from './dto/building.add.represent.dto';
import { BuildingResident, ResidentType } from './entities/building.resident.entity';
import { BuildingRemoveResidentDto } from './dto/building.remove.resident.dto';
import { BuildingConfirmResidentDto as BuildingConfirmResidentDto } from './dto/building.confrim.resident.dto';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        private connection: Connection,

        private readonly authJwtService: AuthJwtService,
        private readonly publicDataService: PublicDataService,

        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
        @InjectRepository(Building)
        private readonly buildingRepository : Repository<Building>,
        @InjectRepository(BuildingRequest)
        private readonly buildingRequestRepository : Repository<BuildingRequest>,
        @InjectRepository(BuildingResident)
        private readonly buildingResidentRepository : Repository<BuildingResident>,
        @InjectRepository(BuildingArea)
        private readonly buildingAreaRepository : Repository<BuildingArea>,

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

        const user = await this.userRepository.findOne({id: payload.id});
        const newBuildingArea = await this.buildingAreaRepository.find({relations: ['building'], where: {residentName: user.name, residentPhone: user.phone, isRegister: false}});

        return {
            user,
            newBuildingArea
        }
    }

    async findBuilding(payload: UserPayload, dto: BuildingDto) {

        const building = await this.buildingRepository.findOne({relations: ['BuildingAreas'], where: {sigunguCd: dto.sigunguCd, bjdongCd: dto.bjdongCd, bun: dto.bun, ji: dto.ji}});
        if (building == undefined) {
            throw new NotFoundException('Not found building');
        }

        return building;
    }

    async createBuilding(payload: UserPayload, dto: BuildingDto) {

        let building = await this.buildingRepository.findOne({where: {sigunguCd: dto.sigunguCd, bjdongCd: dto.bjdongCd, bun: dto.bun, ji: dto.ji}});
        if (building != undefined) {
            throw new BadRequestException('Already have building info');
        }

        const buildingData = await this.publicDataService.getBrTitleInfo(dto.sigunguCd, dto.bjdongCd, dto.bun, dto.ji);
        let buildingInfo: any;
        if (buildingData.items.item instanceof Array) {
            buildingInfo = buildingData.items.item[0];
        } else {
            buildingInfo = buildingData.items.item
        }

        building = new Building();
        building.sigunguCd = dto.sigunguCd;
        building.bjdongCd = dto.bjdongCd;
        building.bun = dto.bun;
        building.ji = dto.ji;
        building.bldNm = buildingInfo.bldNm;
        building.platPlc = buildingInfo.platPlc;
        building.newPlatPlc = buildingInfo.newPlatPlc;
        building.mainPurpsCdNm = buildingInfo.mainPurpsCdNm;
        building.totArea = buildingInfo.totArea;
        building.useAprDay = buildingInfo.useAprDay;
        building.grndFlrCnt = buildingInfo.grndFlrCnt;
        building.ugrndFlrCnt = buildingInfo.ugrndFlrCnt;
        building.rideUseElvtCnt = buildingInfo.rideUseElvtCnt;
        building.emgenUseElvtCnt = buildingInfo.emgenUseElvtCnt;
        building.indrAutoUtcnt = buildingInfo.indrAutoUtcnt;
        building.oudrAutoUtcnt = buildingInfo.oudrAutoUtcnt;
        building.indrMechUtcnt = buildingInfo.indrMechUtcnt;
        building.oudrMechUtcnt = buildingInfo.oudrMechUtcnt;
        building.strctCdNm = buildingInfo.strctCdNm;
        building.hhldCnt = buildingInfo.hhldCnt;
        building.meta = buildingInfo;

        const buildingAreaData = await this.publicDataService.getBrExposPubuseAreaInfo(dto.sigunguCd, dto.bjdongCd, dto.bun, dto.ji);

        // 전유물만 가져옴
        if (buildingAreaData.items.item instanceof Array) {
            building.buildingAreas = [];

            const buildingAreaInfo = buildingAreaData.items.item.filter((x: { exposPubuseGbCd: number, exposPubuseGbCdNm: string; }) => x.exposPubuseGbCd == 1 && x.exposPubuseGbCdNm == '전유');
            for (const areaInfo of buildingAreaInfo) {

                const buildingArea = new BuildingArea();
                buildingArea.dongNm = areaInfo.dongNm;
                buildingArea.flrNo = areaInfo.flrNo;
                buildingArea.hoNm = areaInfo.hoNm;
                buildingArea.area = areaInfo.area;
                buildingArea.meta = areaInfo;

                building.buildingAreas.push(buildingArea);
            }
        }

        return await this.buildingRepository.save(building);
    }

    async requestBuilding(payload: UserPayload, dto: BuildingRequestDto) {

        const buildingRequest = new BuildingRequest();
        buildingRequest.sigunguCd = dto.sigunguCd;
        buildingRequest.bjdongCd = dto.bjdongCd;
        buildingRequest.bun = dto.bun;
        buildingRequest.ji = dto.ji;
        buildingRequest.bldNm = dto.bldNm;
        buildingRequest.platPlc = dto.platPlc;
        buildingRequest.newPlatPlc = dto.newPlatPlc;
        buildingRequest.userId = payload.id;
        buildingRequest.name = payload.name;
        buildingRequest.phone = payload.phone;

        return await this.buildingRequestRepository.save(buildingRequest);
    }
    
    async isRepresentCheck(userId: number, buildingId: number) {

        // 입주자 대표 체크
        const buildingResident = await this.buildingResidentRepository.createQueryBuilder('buildingResident')
            .innerJoinAndSelect('buildingResident.user', 'user')
            .leftJoinAndSelect('buildingResident.buildingArea', 'buildingArea')
            .leftJoinAndSelect('buildingArea.building', 'building')
            .where('user.id = :userId', {userId: userId})
            .andWhere('building.id = :buildingId', {buildingId: buildingId})
            .getOne();
        
        if (buildingResident.type != ResidentType.REPRESENT) {
            throw new BadRequestException('Invlidate resident type');
        }
    }
    
    async addRepresentInBuilding(payload: UserPayload, buildingId: number, dto: BuildingAddRepresentDto) {

        const buildingArea = await this.buildingAreaRepository.createQueryBuilder('buildingArea')
            .innerJoin('buildingArea.building', 'building')
            .where('building.id = :buildingId', {buildingId: buildingId})
            .andWhere('buildingArea.id = :areaId', {areaId: dto.buildingAreaId})
            .getOne();
        
        if (buildingArea == undefined) {
            throw new NotFoundException('Not found building area');
        }

        if (buildingArea.isRegister == true) {
            throw new BadRequestException('Already register redident');
        }

        buildingArea.residentName = payload.name;
        buildingArea.residentPhone = payload.phone;
        buildingArea.isRegister = true;

        const buildingResident = new BuildingResident();
        buildingResident.buildingArea = buildingArea;
        buildingResident.type = ResidentType.REPRESENT;
        buildingResident.user = new User();
        buildingResident.user.id = payload.id;

        await this.connection.transaction(async manager => {
            await manager.save(buildingArea);
            await manager.save(buildingResident);
        });
    
    }

    async addResidentInBuilding(payload: UserPayload, buildingId: number, dto: BuildingAddResidentDto) {

        await this.isRepresentCheck(payload.id, buildingId);

        const buildingArea = await this.buildingAreaRepository.createQueryBuilder('buildingArea')
            .innerJoin('buildingArea.building', 'building')
            .where('building.id = :buildingId', {buildingId: buildingId})
            .andWhere('buildingArea.id = :areaId', {areaId: dto.buildingAreaId})
            .getOne();
        
        if (buildingArea == undefined) {
            throw new NotFoundException('Not found building area');
        }

        if (buildingArea.isRegister == true) {
            throw new BadRequestException('Already register redident');
        }

        buildingArea.residentName = dto.residentName;
        buildingArea.residentPhone = dto.residentPhone;

        await this.buildingAreaRepository.save(buildingArea);
    }

    async deleteResidentInBuilding(payload: UserPayload, buildingId: number, dto: BuildingRemoveResidentDto) {

        await this.isRepresentCheck(payload.id, buildingId);

        const buildingArea = await this.buildingAreaRepository.createQueryBuilder('buildingArea')
            .innerJoin('buildingArea.building', 'building')
            .where('building.id = :buildingId', {buildingId: buildingId})
            .andWhere('buildingArea.id = :areaId', {areaId: dto.buildingAreaId})
            .getOne();
        
        if (buildingArea == undefined) {
            throw new NotFoundException('Not found building area');
        }

        if (buildingArea.isRegister != true) {
            throw new BadRequestException('Invalidate register area');
        }

        buildingArea.residentName = null;
        buildingArea.residentPhone = null;
        buildingArea.isRegister = false;

        const buildingResident = await this.buildingResidentRepository.createQueryBuilder('buildingResident')
            .leftJoinAndSelect('buildingResident.buildingArea', 'buildingArea')
            .where('buildingArea.id = :areaId', {areaId: dto.buildingAreaId})
            .getMany();

        await this.connection.transaction(async manager => {
            await manager.save(buildingArea);
            await manager.remove(buildingResident);
        });
    }

    async confirmResidentInBuilding(payload: UserPayload, buildingId: number, dto: BuildingConfirmResidentDto) {

        const buildingArea = await this.buildingAreaRepository.createQueryBuilder('buildingArea')
            .innerJoin('buildingArea.building', 'building')
            .where('building.id = :buildingId', {buildingId: buildingId})
            .andWhere('buildingArea.id = :areaId', {areaId: dto.buildingAreaId})
            .getOne();
        
        if (buildingArea == undefined) {
            throw new NotFoundException('Not found building area');
        }

        if (buildingArea.isRegister == true) {
            throw new BadRequestException('Invalidate register area');
        }

        buildingArea.isRegister = true;

        const buildingResident = new BuildingResident();
        buildingResident.buildingArea = buildingArea;
        buildingResident.type = ResidentType.NORMAL;
        buildingResident.user = new User();
        buildingResident.user.id = payload.id;

        await this.connection.transaction(async manager => {
            await manager.save(buildingArea);
            await manager.save(buildingResident);
        });
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
