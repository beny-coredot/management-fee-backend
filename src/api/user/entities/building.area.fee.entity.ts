import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingArea } from "./building.area.entity";
import { Building } from "./building.entity";
import { BuildingResident } from "./building.resident.entity";
import { BuildingVote } from "./building.vote.entity";

export enum FeeType {
    PUBLIC = "PUBLIC",
    UNIT = "UNIT",
}

@Entity()
export class BuildingAreaFee {

    @PrimaryGeneratedColumn({ comment: '건물 분류 요금 id'})
    id: number;

    @Column( { type: 'enum', enum: FeeType, name: 'type', comment: '요금 타입(공용,세대)' })
    type: FeeType;

    @Column( { name: 'year', comment: '연도' })
    year: number;

    @Column( { name: 'month', comment: '월' })
    month: number;

    @Column( { name: 'fee', comment: '요금' })
    fee: number;

    @Column( { name: 'after_fee', comment: '기한 후 요금' })
    afterFee: number;

    @Column( { type: 'date', name: 'due_date', comment: '납부 기한' })
    dueDate: Date;
    
    @Column( { name: 'is_pay', comment: '납부 여부', default: false })
    isPay: boolean;

    @Column({ type: 'simple-json', name: 'unit_electricity', comment: '세대 전기 설정'})
    unitElectricity: object;

    @Column({ type: 'simple-json', name: 'unit_gas', comment: '세대 가스 설정'})
    unitGas: object;

    @Column({ type: 'simple-json', name: 'unit_water', comment: '세대 수도 설정'})
    unitWater: object;

    @Column({ type: 'simple-json', name: 'meta', comment: '메타 정보(json)(공용 및 세대)'})
    meta: object;

    @ManyToOne(() => BuildingArea, buildingArea => buildingArea.buildingFees, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'building_area_id'})
    buildingArea: BuildingArea;
    
    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false })
    createdAt: Date;
}
