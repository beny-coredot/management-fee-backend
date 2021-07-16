import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingResident } from "./building.resident.entity";

@Entity()
export class UserOTP {

    @PrimaryGeneratedColumn({ comment: 'otp id'})
    id: number;

    @Column({ name: 'name', comment: '이름' })
    name: string;

    @Column( { name: 'phone', comment: '폰번호' })
    phone: string;

    @Column( { name: 'password', comment: '비밀번호' })
    password: string;

    @Column( { name: 'expired_time', comment: '만료일' })
    expiredTime: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false })
    createdAt: Date;
}
