import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Produce as ProduceEntity } from '../produce/produce.entity';
import { User as UserEntity } from '../user/user.entity';

@Entity()
export class Price extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    price: number;

    @Column()
    unit: string;

    @ManyToOne(type => ProduceEntity, produceEntity => produceEntity.price)
    produceId: ProduceEntity;

    @ManyToOne(type => UserEntity, userEntity => userEntity.price)
    userId: UserEntity;

    @Column('timestamp')
    createdDate: string;

    @Column()
    active: boolean;
}
