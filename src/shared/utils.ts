import { User } from '../user/user.entity';

const allDeleted = (element: any) => element.isDeleted();

function filterUserRelation(entity: any): void {
  entity.user = new User({
    id: entity.user.id,
    firstName: entity.user.firstName,
    lastName: entity.user.lastName,
    userName: entity.user.userName,
    email: entity.user.email,
  });
}

export {
  allDeleted,
  filterUserRelation, 
};
