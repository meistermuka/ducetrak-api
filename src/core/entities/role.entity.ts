import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User as UserEntity } from '../../user/user.entity';

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    role: string;

    @OneToMany(type => UserEntity, userEntity => userEntity.role)
    user: UserEntity[]
}