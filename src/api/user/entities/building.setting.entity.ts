import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingAreaFee } from "./building.area.fee.entity";
import { Building } from "./building.entity";
import { BuildingResident } from "./building.resident.entity";
import { BuildingVote } from "./building.vote.entity";


@Entity()
export class BuildingSetting {

    @PrimaryGeneratedColumn({ comment: '건물 셋팅 id'})
    id: number;

    @Column( { name: 'pay_account', comment: '결제 계좌' })
    payAccount: string;

    @Column( { name: 'pay_back', comment: '결제 은행' })
    payBank: string;

    @Column( { name: 'pay_name', comment: '결제 예금주명' })
    payName: string;

    @Column( { type: 'date', name: 'expose_date', comment: '노출 일자' })
    exposeDate: Date;

    @Column( { type: 'date', name: 'due_date', comment: '납부 기한' })
    dueDate: Date;

    @Column( { name: 'add_fee_rate', comment: '기한 후 추가 비용 퍼센트' })
    addFeeRate: number;

    @OneToOne(() => Building, building => building.setting, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'building_id'})
    building: Building;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일', select: false })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', comment: '생성일', select: false  })
    createdAt: Date;
}
