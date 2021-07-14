import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Building } from "./building.entity";
import { BuildingNotice } from "./building.notice";
import { User } from "./user.entity";

@Entity()
export class BuildingVote {

    @PrimaryGeneratedColumn({ comment: '고유 넘버'})
    id: number;

    @Column( { name: 'votingItems', comment: '투표 항목 (json array)' })
    votingItems: object;

    @Column( { name: 'is_alarm', comment: '알림 여부' })
    isAlarm: boolean;

    @Column( { name: 'is_anonymity', comment: '익명 여부' })
    isAnonymity: boolean;

    @Column( { name: 'expired_time', comment: '투표 마감일' })
    expiredTime: Date;

    @OneToOne(() => BuildingNotice, buildingNotice => buildingNotice.vote)
    notice: BuildingNotice;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false })
    createdAt: Date;
}
