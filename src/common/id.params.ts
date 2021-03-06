import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class IdParams {

    @ApiProperty( { description: '요청 id' })
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}
