import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Location as LocationEntity } from '../location/location.entity';
import { Price as PriceEntity } from '../price/price.entity';
import { User as UserEntity } from '../user/user.entity';

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

    @OneToMany(type => PriceEntity, priceEntity => priceEntity.produceId)
    price: PriceEntity[];

    @ManyToOne(type => UserEntity, userEntity => userEntity.produce)
    userId: UserEntity;
}
