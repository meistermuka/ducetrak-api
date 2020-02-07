import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Produce as ProduceEntity } from '../produce/produce.entity';
import { User as UserEntity } from '../user/user.entity';
import { CommonEntity } from '../shared';

@Entity()
export class Price extends CommonEntity {

  constructor() {
    super();
  }
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  unit: string;

  @ManyToOne(type => ProduceEntity, produceEntity => produceEntity.price)
  produce: ProduceEntity;

  @ManyToOne(type => UserEntity, userEntity => userEntity.price)
  user: UserEntity;

}
