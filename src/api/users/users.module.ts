import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { BuildingNotice } from './entities/building.notice.entity';
import { BuildingResident } from './entities/building.resident.entity';
import { BuildingVote } from './entities/building.vote.entity';
import { BuildingVoteHistory } from './entities/building.vote.history.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
    ],
    controllers: [UsersController],
    providers: [UsersService]
})

export class UsersModule {}
