import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Building } from "./building.entity";
import { User } from "./user.entity";

@Entity()
export class BuildingResident {

    @PrimaryGeneratedColumn({ comment: '고유 넘버'})
    id: number;

    @Column( { name: 'floor_unit', comment: '호실' })
    floorUnit: string;

    @Column( { name: 'resident_name', comment: '입주자 이름' })
    residentName: string;

    @Column( { name: 'resident_phone', comment: '입주자 전화번호' })
    residentPhone: string;

    @Column( { name: 'is_representer', comment: '대표자 여부' })
    isRepresenter: boolean;

    @ManyToOne(() => Building, building => building.buildingResidents, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'building_id'})
    building: Building;

    // @ManyToOne(() => User, user => user.buildingResidents, {onDelete: 'CASCADE'})
    // @JoinColumn({name: 'user_id'})
    // user: User;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false })
    createdAt: Date;
}
