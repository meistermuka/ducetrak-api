import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produce as ProduceEntity } from '../produce/produce.entity';
import { Price as PriceEntity } from '../price/price.entity';
import { Location as LocationEntity } from '../location/location.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column('timestamp')
    createdDate: string;

    @OneToMany(type => ProduceEntity, produceEntity => produceEntity.user)
    produce: ProduceEntity[];

    @OneToMany(type => PriceEntity, priceEntity => priceEntity.user)
    price: PriceEntity[];

    @OneToMany(type => LocationEntity, locationEntity => locationEntity.user)
    location: LocationEntity[];
}
