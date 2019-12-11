import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Produce as ProduceEntity } from 'src/produce/produce.entity';

@Entity()
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    address: string;

    @Column('text')
    coordinates: string;

    @OneToMany(type => ProduceEntity, produceEntity => produceEntity.locationId)
    produce: ProduceEntity[];
}
