import { ApiProperty } from "@nestjs/swagger";

export class BuildingAddRepresentDto {

    @ApiProperty( { description: '건물 입주될 areaId' })
    buildingAreaId: number;
}