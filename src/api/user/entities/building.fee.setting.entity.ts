import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingAreaFee } from "./building.area.fee.entity";
import { Building } from "./building.entity";
import { BuildingResident } from "./building.resident.entity";
import { BuildingVote } from "./building.vote.entity";


export enum FeeSettingType {
    BALANCE = "BALANCE",
    AREA = "AREA",
    EXCLUDE = "EXCLUDE",
}

@Entity()
export class BuildingFeeSetting {

    @PrimaryGeneratedColumn({ comment: '건물 요금 셋팅 id'})
    id: number;

    @Column( { name: 'title', comment: '비용 타이틀' })
    title: string;

    @Column( { name: 'fee', comment: '비용 금액' })
    fee: number;

    @Column( { type: 'enum', enum: FeeSettingType, name: 'type', comment: '비용 타입(균등,면적,제외)' })
    type: FeeSettingType;

    @Column( { type: 'simple-array', name: 'exclude_array', comment: '제외 항목들' })
    excludeArray: number[];

    @ManyToOne(() => Building, building => building.feeSetting, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'building_id'})
    building: Building;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false  })
    createdAt: Date;
}
