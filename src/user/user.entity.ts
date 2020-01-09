import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ConfigService } from '../core/services';
import { Location as LocationEntity } from '../location/location.entity';
import { Price as PriceEntity } from '../price/price.entity';
import { Produce as ProduceEntity } from '../produce/produce.entity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    role: string;

    @Column('timestamp')
    createdDate: string;

    @OneToMany(type => ProduceEntity, produceEntity => produceEntity.user)
    produce: ProduceEntity[];

    @OneToMany(type => PriceEntity, priceEntity => priceEntity.user)
    price: PriceEntity[];

    @OneToMany(type => LocationEntity, locationEntity => locationEntity.user)
    location: LocationEntity[];
}
