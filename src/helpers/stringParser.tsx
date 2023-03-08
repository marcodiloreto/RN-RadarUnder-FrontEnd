import {Discipline, Plan, Week} from '../interfaces/ActivityInterfaces';
import {arrayDeleteOne} from './ArrayStateManager';

//TODO: al 3er elemento, corta y pone "..."
export const parseDisciplinesString = (disciplines: Discipline[]) => {
  return disciplines.reduce((prev, current, index) => {
    if (index === 0) {
      return current.name;
    }
    return prev + ', ' + current.name;
  }, '');
};

export const removeArgentina = (text: string) => {
  const arr = text.split(',');
  if (arr[arr.length - 1].includes('Argentina')) {
    arr.splice(arr.length - 1);
  }
  return arr.toString();
};

export const parsePriceText = (price: number) => {
  if (price !== 0 && price !== -1) {
    return '$' + price.toString();
  } else if (price === -1) {
    return 'A la gorra';
  } else if (price === 0) {
    return 'Gratis';
  } else {
    return '';
  }
};

export const parseWeekString = (days: Week[]) => {
  const string = days.reduce((prev, day, index) => {
    if (index === days.length - 1) {
      return prev + day.toLocaleLowerCase();
    }
    if (index === days.length - 2) {
      return prev + day.toLocaleLowerCase() + ' y ';
    }
    return prev + day.toLocaleLowerCase() + ', ';
  }, '');
  return 'Los ' + string;
};

export const addDaytoWeekString = (
  day: Week,
  weekString: string | undefined,
) => {
  if (weekString) {
    return weekString + ',' + day.toString();
  }
  return day.toString();
};

export const removeDayFromWeekString = (
  day: Week,
  weekString: string | undefined,
) => {
  if (!weekString) return;

  if (weekString.includes(day.toString())) {
    const weekArray = weekString.split(',');

    var flag: number | undefined;
    weekArray.forEach((value, index) => {
      if (value === day.toString()) {
        flag = index;
      }
    });
    if (typeof flag === 'undefined') return;

    return arrayDeleteOne(weekArray, flag).join(',');
  }
};
