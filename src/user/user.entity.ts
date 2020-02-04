import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Role as RoleEntity } from '../core/entities/role.entity';
import { Location as LocationEntity } from '../location/location.entity';
import { Price as PriceEntity } from '../price/price.entity';
import { Produce as ProduceEntity } from '../produce/produce.entity';
import { CommonEntity } from '../shared/common.entity';

@Entity()
export class User extends CommonEntity {

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(type => RoleEntity, roleEntity => roleEntity.user)
  role: RoleEntity;

  @OneToMany(type => ProduceEntity, produceEntity => produceEntity.user)
  produce: ProduceEntity[];

  @OneToMany(type => PriceEntity, priceEntity => priceEntity.user)
  price: PriceEntity[];

  @OneToMany(type => LocationEntity, locationEntity => locationEntity.user)
  location: LocationEntity[];

}
