import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';

import { User as UserEntity } from '../../user/user.entity';

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column({ default: 'false'})
    deleted: boolean;

    @OneToMany(type => UserEntity, userEntity => userEntity.role)
    user: UserEntity[]

    isDeleted(): boolean {
      return this.deleted;
    }
}
