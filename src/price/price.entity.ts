import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Produce as ProduceEntity } from '../produce/produce.entity';
import { User as UserEntity } from '../user/user.entity';

@Entity()
export class Price extends BaseEntity {
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

    @Column('timestamp')
    createdDate: string;

    @Column({ default: 'true' })
    active: boolean;

    isActive(): boolean {
      return this.active;
    }
}
