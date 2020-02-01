import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { Produce as ProduceEntity } from '../produce/produce.entity';
import { User as UserEntity } from '../user/user.entity';
import { CommonEntity } from '../shared';

@Entity()
export class Location extends CommonEntity {

  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  address: string;

  @Column('text')
  coordinates: string;

  @OneToMany(type => ProduceEntity, produceEntity => produceEntity.location)
  produce: ProduceEntity[];

  @ManyToOne(type => UserEntity, userEntity => userEntity.location)
  user: UserEntity;
}
