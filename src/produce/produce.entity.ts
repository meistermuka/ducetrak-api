import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Location as LocationEntity } from '../location/location.entity';
import { Price as PriceEntity } from '../price/price.entity';
import { User as UserEntity } from '../user/user.entity';
import { Type as TypeEntity } from '../core/entities/type.entity';

@Entity()
export class Produce extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @ManyToOne(type => TypeEntity, typeEntity => typeEntity.produce)
    type: number;

    @Column('timestamp')
    createdDate: string;

    @Column('timestamp')
    modifiedDate: string;

    @ManyToOne(type => LocationEntity, locationEntity => locationEntity.produce)
    location: LocationEntity;

    @OneToMany(type => PriceEntity, priceEntity => priceEntity.produce)
    price: PriceEntity[];

    @ManyToOne(type => UserEntity, userEntity => userEntity.produce)
    user: UserEntity;
}
