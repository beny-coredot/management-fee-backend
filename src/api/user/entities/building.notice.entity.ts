import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Building } from "./building.entity";
import { BuildingVote } from "./building.vote.entity";
import { User } from "./user.entity";

export enum NoticeType {
    NOTICE = "NOTICE",
    VOTE = "VOTE",
}


@Entity()
export class BuildingNotice {

    @PrimaryGeneratedColumn({ comment: '공지 id'})
    id: number;

    @Column( { type: 'enum', enum: NoticeType, name: 'type', comment: '타입' })
    type: NoticeType;

    @Column( { name: 'register_name', comment: '등록자 이름' })
    registerName: string;

    @Column( { name: 'title', comment: '제목' })
    title: string;

    @Column( { name: 'contents', comment: '내용' })
    contents: string;

    @ManyToOne(() => Building, building => building.notices, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'building_id'})
    building: Building;

    @OneToOne(() => BuildingVote, buildingVote => buildingVote.notice)
    @JoinColumn({name: 'vote_id'})
    vote: BuildingVote;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일' })
    createdAt: Date;
}
