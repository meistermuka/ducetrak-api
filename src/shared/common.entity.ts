import { Column, BeforeUpdate } from 'typeorm';

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

  @BeforeUpdate()
  updateDates() {
    this.updatedDate = new Date().toISOString();
  }
}

export { CommonEntity };
