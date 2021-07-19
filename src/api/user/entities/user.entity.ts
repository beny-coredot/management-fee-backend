import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingResident } from "./building.resident.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn({ comment: '유저 id'})
    id: number;

    @Column({ name: 'name', comment: '이름' })
    name: string;

    @Column( { name: 'phone', comment: '폰번호' })
    phone: string;

    @Column({ name: 'password', comment: '비밀번호', nullable: true })
    password: string;

    @Column({ name: 'kakao_id', comment: '카카오 id', nullable: true })
    kakaoId: string;

    @Column( { name: 'email', comment: '이메일 주소', nullable: true })
    email: string;

    @Column( { name: 'profile', comment: '프로필 주소', nullable: true })
    profile: string;

    @Column( { name: 'selected_building_idx', comment: '건물 선택된 인덱스', nullable: true })
    selecetdBuildingIdx: number;

    @OneToMany(() => BuildingResident, buildingResident => buildingResident.user)
    buildingResidents: BuildingResident[];
    
    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false })
    createdAt: Date;
}
