import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingNotice } from "./building.notice.entity";
import { BuildingResident } from "./building.resident.entity";

@Entity()
export class Building {

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

    @Column( { name: 'main_purps_cd_nm', comment: '용도' })
    mainPurpsCdNm: string;

    @Column( { type: 'decimal', precision: 19, scale: 9, name: 'tot_area', comment: '연면적' })
    totArea: number;

    @Column( { name: 'use_apr_day', comment: '사용승인일' })
    useAprDay: string;

    @Column( { name: 'grnd_flr_cnt', comment: '층수(지상)' })
    grndFlrCnt: number;

    @Column( { name: 'ugrnd_flr_cnt', comment: '층수(지하)' })
    ugrndFlrCnt: number;

    @Column( { name: 'ride_use_elvt_cnt', comment: '승강기(승용)' })
    rideUseElvtCnt: number;

    @Column( { name: 'emgen_use_elvt_cnt', comment: '승강기(비상)' })
    emgenUseElvtCnt: number;

    @Column( { name: 'indr_auto_utcnt', comment: '자주식 주차수(옥내)' })
    indrAutoUtcnt: number;

    @Column( { name: 'oudr_auto_utcnt', comment: '자주식 주차수(옥외)' })
    oudrAutoUtcnt: number;

    @Column( { name: 'indr_mech_utcnt', comment: '기계식 주차(옥내)' })
    indrMechUtcnt: number;

    @Column( { name: 'oudr_mech_utcnt', comment: '기계식 주차(옥외)' })
    oudrMechUtcnt: number;

    @Column( { name: 'strct_cd_nm', comment: '구조명' })
    strctCdNm: string;

    @Column( { name: 'hh_id_cnt', comment: '세대수(호수 개수)' })
    hhldCnt: number;

    @Column({ type: 'simple-json', name: 'meta', comment: '메타 정보(json)'})
    meta: object;

    @OneToMany(() => BuildingResident, buildingResident => buildingResident.building)
    buildingResidents: BuildingResident[];

    @OneToMany(() => BuildingNotice, buildingNotice => buildingNotice.building)
    notices: BuildingNotice[];

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false })
    createdAt: Date;
}
