import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterBuildingDto {

    @ApiProperty( { description: '시군구코드' })
    sigunguCd: string;

    @ApiProperty( { description: '법정동코드' })
    bjdongCd: string;

    @ApiProperty( { description: '번' })
    bun: string;

    @ApiProperty( { description: '지' })
    ji: string;

}