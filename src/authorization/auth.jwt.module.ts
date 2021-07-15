import { DynamicModule, Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { AuthJwtService } from './auth.jwt.service';
import { AuthJwtStrategy } from './auth.jwt.strategy';

export interface JwtOptions {
    secretKey: string,
    expireDays: string
}

@Module({})
export class AuthJwtModule {
    static register(options: JwtOptions): DynamicModule {
        return {
            module: AuthJwtModule,
            imports: [
                PassportModule, 
                JwtModule.register({secret: options.secretKey, signOptions: {expiresIn: options.expireDays}}),
            ],
            providers: [
                AuthJwtService,
                {
                    provide: AuthJwtStrategy,
                    useValue: new AuthJwtStrategy(options.secretKey)
                }
            ],
            exports: [
                AuthJwtService,
            ]
        }
    }
}
