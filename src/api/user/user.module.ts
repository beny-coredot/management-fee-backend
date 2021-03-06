import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthJwtModule } from 'src/authorization/auth.jwt.module';
import { PublicDataService } from 'src/service/public.data.service';
import { BuildingArea } from './entities/building.area.entity';
import { Building } from './entities/building.entity';
import { BuildingNotice } from './entities/building.notice.entity';
import { BuildingRequest } from './entities/building.request.entity';
import { BuildingResident } from './entities/building.resident.entity';
import { BuildingVote } from './entities/building.vote.entity';
import { BuildingVoteHistory } from './entities/building.vote.history.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Building,
            BuildingRequest,
            BuildingResident,
            BuildingArea,
            BuildingNotice,
            BuildingVote,
            BuildingVoteHistory
        ]),
        AuthJwtModule.register({
            expireDays: '30d',
            secretKey: 'secretuser1234',
        }),
        HttpModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        PublicDataService,
    ]
})

export class UserModule {}
