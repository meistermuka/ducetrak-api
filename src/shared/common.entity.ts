import { Column } from 'typeorm';

export class CommonEntity {

  @Column({default: 'false'})
  deleted: boolean;

  isDeleted(): boolean {
    return this.deleted;
  }
}
