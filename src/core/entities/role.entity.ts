import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';

import { User as UserEntity } from '../../user/user.entity';
import { CommonEntity } from '../../shared/common.entity';

@Entity()
export class Role extends CommonEntity {

  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(type => UserEntity, userEntity => userEntity.role)
  user: UserEntity[];
}
