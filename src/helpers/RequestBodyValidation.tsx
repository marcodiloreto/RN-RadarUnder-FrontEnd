import {ActivityControlData, Plan} from '../interfaces/ActivityInterfaces';
import {Address} from '../interfaces/LocationInterfaces';

export const validateCreateActivityBody = ({
  id,
  name,
  description,
  price,
  disciplines,
  repeatable,
  startDate,
  plan,
  endDate,
  location,
  maxQuota,
}: ActivityControlData) => {
  const errorMessage: string[] = [];

  if (id)
    return 'No es posible crear una actividad que ya existe y está siendo editada';

  if (!name) errorMessage.push('Nombre');
  if (!description) errorMessage.push('Descripción');
  if (price) {
    if (isNaN(+price)) errorMessage.push('Precio');
  } else {
    errorMessage.push('Precio');
  }
  if (typeof disciplines === 'undefined') errorMessage.push('Categoría');
  if (disciplines?.length < 1) errorMessage.push('Categoría');
  if (maxQuota) {
    if (isNaN(+maxQuota)) {
      errorMessage.push('Cupos no es un numero');
    } else if (maxQuota === 0 || maxQuota < -1) {
      errorMessage.push('Cupos negativos');
    }
  } else {
    errorMessage.push('Cupos no puede ser 0');
  }
  if (repeatable) {
    if (!(startDate instanceof Date)) errorMessage.push('Fecha de inicio');
    if (plan!.length < 1) {
      errorMessage.push('Planes');
    } else if (
      !!!plan!.reduce((previous, plan) => {
        return previous && validatePlan(plan);
      }, true)
    ) {
      errorMessage.push('Algunos planes');
    }
    if (!(endDate instanceof Date)) errorMessage.push('Fecha de fin');
  } else {
    if (!(startDate instanceof Date && endDate instanceof Date))
      errorMessage.push('Fechas y horarios');
  }
  if (!location) {
    errorMessage.push('Dirección');
  } else if (!validateLocation(location)) errorMessage.push('Dirección');

  if (errorMessage.length > 0) {
    const message = errorMessage.reduce((prev, current) => {
      return prev + ',\n' + current;
    });
    return 'Problemas con: \n' + message;
  } else {
    return '';
  }
};

export const validateUpdateActivityBody = ({
  id,
  name,
  description,
  price,
  disciplines,
  repeatable,
  startDate,
  plan,
  endDate,
  location,
  maxQuota,
}: ActivityControlData) => {
  const errorMessage: string[] = [];

  if (!name) errorMessage.push('Nombre');
  if (!description) errorMessage.push('Descripción');
  if (price) {
    if (isNaN(+price)) errorMessage.push('Precio');
  } else {
    errorMessage.push('Precio');
  }
  if (typeof disciplines === 'undefined') errorMessage.push('Categoría');
  if (disciplines?.length < 1) errorMessage.push('Categoría');
  if (maxQuota) {
    if (isNaN(+maxQuota)) {
      errorMessage.push('Cupos no es un numero');
    } else if (maxQuota < -1) {
      errorMessage.push('Cupos negativos');
    }
  } else {
    errorMessage.push('Cupos no puede ser 0');
  }
  if (repeatable) {
    if (!(startDate instanceof Date)) errorMessage.push('Fecha de inicio');
    if (plan!.length < 1) {
      errorMessage.push('Planes');
    } else if (
      !!!plan!.reduce((previous, plan) => {
        return previous && validatePlan(plan);
      }, true)
    ) {
      errorMessage.push('Algunos planes');
    }
    if (!(endDate instanceof Date)) errorMessage.push('Fecha de fin');
  } else {
    if (!(startDate instanceof Date && endDate instanceof Date))
      errorMessage.push('Fechas y horarios');
  }
  if (!location) {
    errorMessage.push('Dirección');
  } else if (!validateLocation(location)) errorMessage.push('Dirección');

  if (errorMessage.length > 0) {
    const message = errorMessage.reduce((prev, current) => {
      return prev + ',\n' + current;
    });
    return 'Problemas con: \n' + message;
  } else {
    return '';
  }
};

const validatePlan = ({days, endTime, startTime}: Plan): boolean => {
  var isValid: boolean = true;
  if (!(startTime instanceof Date)) isValid = false;
  if (!(endTime instanceof Date)) isValid = false;
  if (days.length < 1) isValid = false;
  return isValid;
};

const validateLocation = ({address, lat, lng}: Address) => {
  var isValid: boolean = true;
  if (typeof address !== 'string') isValid = false;
  if (typeof lat !== 'number') isValid = false;
  if (typeof lng !== 'number') isValid = false;
  return isValid;
};

export const isNotNullishValue = <T extends boolean | string | number | object>(
  arg: T,
) => {
  if (typeof arg === 'undefined') return false;

  return true;
};

export const toGenericString = <T extends boolean | string | number | object>(
  arg: T,
) => {
  if (typeof arg === 'string') {
    return arg;
  } else if (typeof arg === 'boolean') {
    if (arg) {
      return 'true';
    } else {
      return 'false';
    }
  } else if (typeof arg === 'number') {
    return arg.toString();
  } else if (typeof arg === 'object') {
    return undefined;
  }
};
