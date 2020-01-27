import { Column } from 'typeorm';

class CommonEntity {

  @Column({default: 'false'})
  deleted: boolean;

  isDeleted(): boolean {
    return this.deleted;
  }
}

export { CommonEntity };
