import { ApiProperty } from "@nestjs/swagger";

export class BuildingRemoveResidentDto {

    @ApiProperty( { description: '건물 제거될 areaId' })
    buildingAreaId: number;
}