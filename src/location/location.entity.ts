import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Produce as ProduceEntity } from '../produce/produce.entity';
import { User as UserEntity } from '../user/user.entity';

@Entity()
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    address: string;

    @Column('text')
    coordinates: string;

    @Column({ default: 'false'})
    deleted: boolean;

    @OneToMany(type => ProduceEntity, produceEntity => produceEntity.location)
    produce: ProduceEntity[];

    @ManyToOne(type => UserEntity, userEntity => userEntity.location)
    user: UserEntity;

    isDeleted(): boolean {
      return this.deleted;
    }
}
