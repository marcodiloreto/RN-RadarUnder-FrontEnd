import {CreatedBy} from '../interfaces/ActivityInterfaces';

export const validateUserOwnership = (owners: CreatedBy[], userId: number) => {
  var flag = false;
  var i = 0;
  while (i < owners.length && flag === false) {
    if (owners[i].id === userId) {
      flag = true;
    }
    i++;
  }

  return flag;
};
