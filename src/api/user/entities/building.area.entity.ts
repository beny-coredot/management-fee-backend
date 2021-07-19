import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingAreaFee } from "./building.area.fee.entity";
import { Building } from "./building.entity";
import { BuildingResident } from "./building.resident.entity";
import { BuildingVote } from "./building.vote.entity";


@Entity()
export class BuildingArea {

    @PrimaryGeneratedColumn({ comment: '건물 분류 id'})
    id: number;

    @Column( { name: 'dong_nm', comment: '동명칭' })
    dongNm: string;

    @Column( { type: 'decimal', precision: 10, scale: 1, name: 'flr_no', comment: '층번호' })
    flrNo: number;

    @Column( { name: 'ho_nm', comment: '호이름' })
    hoNm: string;

    @Column( { type: 'decimal', precision: 19, scale: 9, name: 'area', comment: '면적' })
    area: number;

    @Column({ type: 'simple-json', name: 'meta', comment: '메타 정보(json)'})
    meta: object;

    @Column( { name: 'resident_name', comment: '입주자 이름', nullable: true })
    residentName: string;

    @Column( { name: 'resident_phone', comment: '입주자 전화번호', nullable: true })
    residentPhone: string;

    @Column( { name: 'is_register', comment: '입주자 등록 여부', default: false })
    isRegister: boolean;

    @ManyToOne(() => Building, building => building.buildingAreas, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'building_id'})
    building: Building;
    
    @OneToMany(() => BuildingResident, buildingResident => buildingResident.buildingArea)
    buildingResidents: BuildingResident[];

    @OneToMany(() => BuildingAreaFee, buildingAreaFee => buildingAreaFee.buildingArea)
    buildingFees: BuildingAreaFee[];

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false  })
    createdAt: Date;
}
