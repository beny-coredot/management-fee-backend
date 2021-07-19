import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class IdSlugParams {

    @ApiProperty( { description: '요청 id' })
    @IsNotEmpty()
    @IsNumberString()
    id: number;

    @ApiProperty( { description: '요청 slug' })
    @IsNotEmpty()
    @IsNumberString()
    slug: number;
}
