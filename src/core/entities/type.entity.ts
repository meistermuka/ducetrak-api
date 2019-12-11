import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produce as ProduceEntity } from '../../produce/produce.entity';

export class Type extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => ProduceEntity, produceEntity => produceEntity.type)
    produce: ProduceEntity[];
}
