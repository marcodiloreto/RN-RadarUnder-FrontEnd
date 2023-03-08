import {Week} from '../interfaces/ActivityInterfaces';

export const arrayDeleteOne = <T extends object | string>(
  array: T[],
  index: number,
) => {
  array.splice(index, 1);
  return array;
};

export const arrayDeleteSection = <T extends object | string>(
  array: T[],
  from: number,
  deleteCount: number,
) => {
  array.splice(from, deleteCount);
  return array;
};

export const arrayAddOne = <T extends object | string>(array: T[], item: T) => {
  array.push(item);
  return array;
};

export const arrayModifyOne = <T extends object>(
  array: T[],
  item: T,
  index: number,
) => {
  array[index] = item;
  return array;
};

export const weekDaysSort = (toBeSorted: Week[]) => {
  const weekDayOrder = Object.values(Week);
  return toBeSorted.sort(
    (a, b) => weekDayOrder.indexOf(a) - weekDayOrder.indexOf(b),
  );
};
