import { ApiProperty } from "@nestjs/swagger";

export class UserJoinDTO {

    @ApiProperty({ name: 'name', description: '이름' })
    name: string;

    @ApiProperty( { name: 'phone', description: '폰번호' })
    phone: string;

    @ApiProperty({ name: 'kakao_id', description: '카카오 id', required: false })
    kakaoId: string;

    @ApiProperty( { name: 'email', description: '이메일 주소', required: false })
    email: string;

    @ApiProperty( { name: 'profile', description: '프로필 주소', required: false })
    profile: string;

}