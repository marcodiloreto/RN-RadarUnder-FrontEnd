import {AxiosError} from 'axios';

const parseErrorMessages = (errorMessages: string[] | string): string => {
  if (typeof errorMessages === 'string') return errorMessages;

  const errorMessage = errorMessages.reduce((previous, current, index) => {
    if (index === 0) return current;
    return previous + ', \n' + current;
  }, '');
  return errorMessage;
};

export default parseErrorMessages;
