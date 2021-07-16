import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class UserLoginDto {

    @ApiProperty( { description: '이름' })
    name: string;

    @ApiProperty( { description: '폰번호 ex) 010-1234-1234' })
    @IsPhoneNumber('KR')
    phone: string;
    
}