import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produce as ProduceEntity } from '../produce/produce.entity';
import { Price as PriceEntity } from '../price/price.entity';
import { Location as LocationEntity } from '../location/location.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column('timestamp')
    createdDate: string;

    @OneToMany(type => ProduceEntity, produceEntity => produceEntity.userId)
    produce: ProduceEntity[];

    @OneToMany(type => PriceEntity, priceEntity => priceEntity.userId)
    price: PriceEntity[];

    @OneToMany(type => LocationEntity, locationEntity => locationEntity.userId)
    location: LocationEntity[];
}
