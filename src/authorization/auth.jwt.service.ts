import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthJwtService {
    constructor(private readonly jwtService: JwtService) {
    }

    async validateJWT(token: string)
    {
        await this.jwtService.verifyAsync(token);
    }

    async createJWT(payload: any)
    {
        return this.jwtService.sign(payload);
    }
}
