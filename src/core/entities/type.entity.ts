import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Produce as ProduceEntity } from '../../produce/produce.entity';

@Entity()
export class Type extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: 'false'})
    deleted: boolean;

    @OneToMany(type => ProduceEntity, produceEntity => produceEntity.type)
    produce: ProduceEntity[];

    isDeleted(): boolean {
      return this.deleted;
    }
}
