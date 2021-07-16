import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingArea } from "./building.area.entity";
import { Building } from "./building.entity";
import { User } from "./user.entity";

export enum ResidentType {
    NORMAL = "NORMAL",
    REPRESENT = "REPRESENT",
    FAMILY = "FAMILY",
}


@Entity()
export class BuildingResident {

    @PrimaryGeneratedColumn({ comment: '입주자 id'})
    id: number;

    @Column( { type: 'enum', enum: ResidentType, name: 'type', comment: '입주자 타입(일반,대표,가족)' })
    type: ResidentType;

    @ManyToOne(() => BuildingArea, buildingArea => buildingArea.buildingResidents, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'building_area_id'})
    buildingArea: BuildingArea;

    @ManyToOne(() => User, user => user.buildingResidents, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false })
    createdAt: Date;
}
