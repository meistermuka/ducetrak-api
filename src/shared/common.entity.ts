import { Column, BeforeUpdate, BeforeInsert } from 'typeorm';

class CommonEntity {

  @Column('timestamp')
  createdDate: string;

  @Column('timestamp')
  updatedDate: string;

  @Column({default: 'false'})
  deleted: boolean;

  isDeleted(): boolean {
    return this.deleted;
  }

  @BeforeInsert()
  createDates() {
    const date = new Date().toISOString();
    this.createdDate = date;
    this.updatedDate = date;
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedDate = new Date().toISOString();
  }
}

export { CommonEntity };
