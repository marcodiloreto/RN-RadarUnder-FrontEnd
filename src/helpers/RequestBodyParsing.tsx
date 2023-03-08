import {Asset} from 'react-native-image-picker';
import {
  ActivityControlData,
  SearchActivityRequestData,
} from '../interfaces/ActivityInterfaces';
import {isNotNullishValue, toGenericString} from './RequestBodyValidation';

export const ParseCreateActivityBody = (activity: ActivityControlData) => {
  if (typeof activity.repeatable === 'undefined') {
    activity.repeatable = false;
  }

  if (!activity.repeatable) {
    delete activity.plan;
  }

  // delete activity.location.viewport;

  delete activity.images;

  console.log(
    ' ------------- CUERPO VALIDADO -------------- \n' +
      JSON.stringify(activity, null, 5),
  );
  return activity;
};

export const parseUpdateActivityBody = (activity: ActivityControlData) => {
  // if (activity.plan) {
  //   activity.repeatable = true;
  // }
  return activity;
};

export const multiformDataImages = (images: Asset[], id: number) => {
  const imageData = new FormData();
  images.forEach((image, index) => {
    imageData.append(index.toString(), {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
  });
  imageData.append('id', id);

  return imageData;
};

export const parseFiltersGetRequest = (filters: SearchActivityRequestData) => {
  var params = '?';

  for (const field in filters) {
    //@ts-ignore
    if (isNotNullishValue(filters[field])) {
      if (field === 'discipline') {
        params = params.concat(
          'discipline' + '=' + filters.discipline!.id + '&',
        );
      } else {
        params = params.concat(
          //@ts-ignore
          field + '=' + toGenericString(filters[field]) + '&',
        );
      }
    }
  }
  console.log(params);
  return params;
};
