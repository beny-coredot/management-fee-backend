import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ comment: '고유 넘버'})
    id: number;

    @Column({ comment: '카카오 고유키' })
    @Index('key_idx', {unique: true})
    key: string;

    @Column({ comment: '이름' })
    name: string;
    
    @Column( { comment: '폰번호' })
    phone: string;

    @Column( { comment: '이메일 주소' })
    email: string;

}
