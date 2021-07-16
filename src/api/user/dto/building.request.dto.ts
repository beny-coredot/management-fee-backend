import { ApiProperty } from "@nestjs/swagger";

export class BuildingRequestDto {

    @ApiProperty( { description: '시군구코드' })
    sigunguCd: string;

    @ApiProperty( { description: '법정동코드' })
    bjdongCd: string;

    @ApiProperty( { description: '번' })
    bun: string;

    @ApiProperty( { description: '지' })
    ji: string;

    @ApiProperty({ description: '건물명' })
    bldNm: string;

    @ApiProperty( { description: '법정동 주소' })
    platPlc: string;

    @ApiProperty( { description: '도로명 주소' })
    newPlatPlc: string;
}