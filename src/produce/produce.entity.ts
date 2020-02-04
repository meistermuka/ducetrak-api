import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Type as TypeEntity } from '../core/entities/type.entity';
import { Location as LocationEntity } from '../location/location.entity';
import { Price as PriceEntity } from '../price/price.entity';
import { User as UserEntity } from '../user/user.entity';
import { CommonEntity } from '../shared';

@Entity()
export class Produce extends CommonEntity {

  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @ManyToOne(type => TypeEntity, typeEntity => typeEntity.produce)
  type: TypeEntity;

  @ManyToOne(type => LocationEntity, locationEntity => locationEntity.produce)
  location: LocationEntity;

  @OneToMany(type => PriceEntity, priceEntity => priceEntity.produce)
  price: PriceEntity[];

  @ManyToOne(type => UserEntity, userEntity => userEntity.produce)
  user: UserEntity;

}
