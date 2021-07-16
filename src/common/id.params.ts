import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class IdParams {

    @ApiProperty( { description: '요청 ID' })
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}
