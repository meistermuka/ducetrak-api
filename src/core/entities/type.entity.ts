import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Produce as ProduceEntity } from '../../produce/produce.entity';
import { CommonEntity } from '../../shared/common.entity';

@Entity()
export class Type extends CommonEntity {

  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => ProduceEntity, produceEntity => produceEntity.type)
  produce: ProduceEntity[];
}
