import { ApiProperty } from "@nestjs/swagger";

export class BuildingConfirmResidentDto {

    @ApiProperty( { description: '건물 입주될 areaId' })
    buildingAreaId: number;

    @ApiProperty( { description: '입주자 확인(등록) 여부' })
    isRegister: boolean;

}