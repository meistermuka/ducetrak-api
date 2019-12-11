import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Produce as ProduceEntity } from '../produce/produce.entity';

@Entity()
export class Price extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    price: number;

    @Column()
    unit: string;

    @ManyToOne(type => ProduceEntity, produceEntity => produceEntity.id)
    produceId: ProduceEntity;

    @Column('timestamp')
    createdDate: string;

    @Column()
    active: boolean;
}
