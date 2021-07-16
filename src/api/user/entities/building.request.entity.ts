import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingArea } from "./building.area.entity";
import { BuildingNotice } from "./building.notice.entity";

@Entity()
export class BuildingRequest {

    @PrimaryGeneratedColumn({ comment: '건물 id'})
    id: number;

    @Column({ name: 'sigungu_cd', comment: '시군구코드' })
    sigunguCd: string;

    @Column({ name: 'bjdong_cd', comment: '법정동코드' })
    bjdongCd: string;

    @Column({ name: 'bun', comment: '번' })
    bun: string;

    @Column({ name: 'ji', comment: '지' })
    ji: string;

    @Column({ name: 'bld_nm', comment: '건물명' })
    bldNm: string;

    @Column( { name: 'plat_plc', comment: '법정동 주소' })
    platPlc: string;

    @Column( { name: 'new_plat_plc', comment: '도로명 주소' })
    newPlatPlc: string;

    @Column({ name: 'user_id', comment: '유저 id' })
    userId: number;

    @Column({ name: 'name', comment: '이름' })
    name: string;

    @Column( { name: 'phone', comment: '폰번호' })
    phone: string;

    @CreateDateColumn({ name: 'created_at', comment: '생성일' })
    createdAt: Date;
}
