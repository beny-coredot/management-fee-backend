import { ApiProperty } from "@nestjs/swagger";

export class BuildingAddResidentDto {

    @ApiProperty( { description: '건물 입주될 id' })
    buildingAreaId: number;

    @ApiProperty( { description: '입주자 이름' })
    residentName: string;

    @ApiProperty( { description: '입주자 전화번호 '})
    residentPhone: string;
}