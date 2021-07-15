import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Building } from "./building.entity";
import { BuildingNotice } from "./building.notice.entity";
import { BuildingVote } from "./building.vote.entity";
import { User } from "./user.entity";

@Entity()
export class BuildingVoteHistory {

    @PrimaryGeneratedColumn({ comment: '투표 이력 id'})
    id: number;

    @Column( { name: 'voting_idx', comment: '투표 인덱스' })
    votingIdx: number;

    @Column( { name: 'resident_id', comment: '입주자 id' })
    residentId: number;

    @OneToOne(() => BuildingNotice, buildingNotice => buildingNotice.vote)
    notice: BuildingNotice;

    @ManyToOne(() => BuildingVote, buildingVote => buildingVote.buildingVoteHistories, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'building_vote_id'})
    vote: BuildingVote;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false })
    createdAt: Date;
}
