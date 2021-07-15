import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthJwtService } from 'src/authorization/auth.jwt.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly authJwtService: AuthJwtService,

        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
    ) {}

    async login() {
        const payload = {
            id: 123,
            name: 'test'
        };
        return this.authJwtService.createJWT(payload);
    }
    
    async findOne() {
        return {
            id: 123,
            name: 'test'
        };
    }


    async findAll() {
        return await this.userRepository.find();
    }
    
}
