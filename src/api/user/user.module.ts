import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthJwtModule } from 'src/authorization/auth.jwt.module';
import { Building } from './entities/building.entity';
import { BuildingNotice } from './entities/building.notice.entity';
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
            BuildingResident,
            BuildingNotice,
            BuildingVote,
            BuildingVoteHistory
        ]),
        AuthJwtModule.register({
            expireDays: '30d',
            secretKey: 'secretuser1234',
        })
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}
