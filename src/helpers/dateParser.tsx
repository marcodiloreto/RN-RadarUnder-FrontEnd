import 'datejs';
import {forEach} from 'lodash';
import {
  ActivityControlData,
  ActivityListItemData,
  Plan,
} from '../interfaces/ActivityInterfaces';

export const parseDateString = (date: Date) => {
  return (
    '' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
};

export const parseTimeString = (date: Date) => {
  const timeStringArray = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });
  return timeStringArray;
};

export const removeTimeData = (date: Date) => {
  return new Date(date.toDateString());
};

export const removeDateData = (date: Date) => {
  const newDate = new Date();
  newDate.setHours(date.getHours());
  newDate.setMinutes(date.getMinutes());
  return newDate;
};

export const dateAddTime = (date: Date, time: Date) => {
  //TODO: esto puede causar un bug si cuando la hora se guarda se cambia el día
  // ej: una actividad que se ejecuta a las 22 hs, en el server es el día siguiente
  // a la 1hs
  const newDate = new Date(date);
  newDate.setHours(time.getHours());
  newDate.setMinutes(time.getMinutes());
  return newDate;
};

export const midDay = () => {
  const date = new Date();
  date.setHours(12);
  date.setMinutes(0);
  return date;
};

export const noMins = () => {
  const date = new Date();
  date.setMinutes(0);
  return date;
};

export const parseActivityObjectDates = (activity: ActivityControlData) => {
  if (activity.startDate) activity.startDate = new Date(activity.startDate);
  if (activity.endDate) activity.endDate = new Date(activity.endDate);
  if (activity.plan) {
    activity.plan.forEach((plan, index) => {
      if (plan.startTime)
        activity.plan![index].startTime = new Date(
          activity.plan![index].startTime,
        );
      if (plan.endTime)
        activity.plan![index].endTime = new Date(activity.plan![index].endTime);
    });
  }
  return activity;
};

interface DatedActivityData {
  startDate: Date;
  endDate: Date;
  plan: Plan[];
}

export const parseActivityResponseDates = <T extends DatedActivityData>(
  activity: T,
) => {
  if (activity.startDate) activity.startDate = new Date(activity.startDate);
  if (activity.endDate) activity.endDate = new Date(activity.endDate);
  if (activity.plan) {
    activity.plan.forEach((plan, index) => {
      if (plan.startTime)
        activity.plan![index].startTime = new Date(
          activity.plan![index].startTime,
        );
      if (plan.endTime)
        activity.plan![index].endTime = new Date(activity.plan![index].endTime);
    });
  }
  return activity;
};
