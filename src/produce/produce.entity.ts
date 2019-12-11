import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Location as LocationEntity } from '../location/location.entity';
import { Price as PriceEntity } from '../price/price.entity';

@Entity()
export class Produce extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('int')
    typeId: number;

    @Column('timestamp')
    createdDate: string;

    @Column('timestamp')
    modifiedDate: string;

    @ManyToOne(type => LocationEntity, locationEntity => locationEntity.id)
    locationId: LocationEntity;

    @OneToMany(type => PriceEntity, priceEntity => priceEntity.id)
    price: PriceEntity;
}
