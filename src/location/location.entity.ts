import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { Produce as ProduceEntity } from 'src/produce/produce.entity';
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

    @OneToMany(type => ProduceEntity, produceEntity => produceEntity.locationId)
    produce: ProduceEntity[];

    @ManyToOne(type => UserEntity, userEntity => userEntity.location)
    userId: UserEntity;
}
