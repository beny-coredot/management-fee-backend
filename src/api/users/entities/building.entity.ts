import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingNotice } from "./building.notice";
import { BuildingResident } from "./building.resident.entity";

@Entity()
export class Building {

    @PrimaryGeneratedColumn({ comment: '고유 넘버'})
    id: number;

    @Column({ name: 'name', comment: '건물명' })
    name: string;

    @Column( { name: 'address', comment: '주소' })
    address: string;

    @Column( { name: 'build_date', comment: '연식(건축일)' })
    buildDate: string;

    @Column( { name: 'floor', comment: '층수 정보' })
    floor: string;

    @Column( { name: 'unit', comment: '호수 정보' })
    unit: string;

    @Column({ name: 'meta', comment: '추가 정보(json)'})
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
