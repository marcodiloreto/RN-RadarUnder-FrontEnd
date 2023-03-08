import React, {createContext, useState} from 'react';
import sagiApi, {BASEURL} from '../api/sagiApi';
import {
  ActivityControlData,
  ActivityListItemData,
  CreatedActivitiesResponse,
} from '../interfaces/ActivityInterfaces';
import {Asset} from 'react-native-image-picker';
import {AxiosError} from 'axios';
import {useForm} from '../hooks/useForm';
import useLocation from '../hooks/useLocation';
import {
  parseActivityObjectDates,
  parseActivityResponseDates,
} from '../helpers/dateParser';
import {
  multiformDataImages,
  ParseCreateActivityBody,
  parseUpdateActivityBody,
} from '../helpers/RequestBodyParsing';
import {UploadImageResponse} from '../interfaces/ImageInterfaces';
import {
  validateCreateActivityBody,
  validateUpdateActivityBody,
} from '../helpers/RequestBodyValidation';

type CreatedActivitiesContextProps = {
  activities: ActivityListItemData[];
  activity: ActivityControlData | undefined;
  loadActivities: () => Promise<void>;
  addActivity: () => Promise<number | string>;
  updateActivity: (id: number) => Promise<string | number>;
  addActivityOwner: () => Promise<void>;
  deleteImage: (id: number) => Promise<any>;
  deleteActivity: (id: number) => Promise<boolean>;
  undoDeleteActivity: (id: number) => Promise<boolean>;
  loadActivityControlData: (id: number) => Promise<boolean>;
  uploadImages: (assets: Asset[], id: number) => Promise<boolean>;
  setActivityField: <K extends Object>(
    value: K,
    field: keyof ActivityControlData,
  ) => void;
  setMultipleActivityField: <K extends Object>(
    value: K,
    fields: (keyof ActivityControlData)[],
  ) => void;
  setActivity: (newState: ActivityControlData) => void;
  clearActivity: () => void;
};

//TODO: notificacion de aviso al cambio del estado de la actividad (ej: se canceló) a los anotados / interesados
//          NO es lo mismo cancelar una actividad a cancelar un evento.
//              el usuario lo tiene que saber!!!!!

export const CreatedActivitiesContext = createContext(
  {} as CreatedActivitiesContextProps,
);

export const CreatedActivitiesProvider = ({children}: any) => {
  const {reverseGeocode} = useLocation();
  const [activities, setActivities] = useState<ActivityListItemData[]>([]);
  const {
    form: activity,
    clearForm: clearActivity,
    setFormField: setActivityField,
    setFormValue: setActivity,
    setMultipleFormField: setMultipleActivityField,
  } = useForm({} as ActivityControlData);

  const loadActivities = async () => {
    try {
      const resp = await sagiApi.get<CreatedActivitiesResponse>(
        '/activity/created',
      );
      if (resp.data.activities.length > 0) {
        const parsedResp = resp.data.activities.map(act => {
          return parseActivityResponseDates(act);
        });
        setActivities([...parsedResp]);
      } else {
        setActivities([]);
      }
    } catch (error: any) {
      console.error(' ---------- ERROR ----------- ');
      console.log(JSON.stringify(error, null, 5));
    }
  };
  const addActivity = async (): Promise<number | string> => {
    const activityImpurities = validateCreateActivityBody(activity);
    if (activityImpurities.length < 1) {
      try {
        const request = ParseCreateActivityBody({...activity});
        const response = await sagiApi.post<ActivityControlData>(
          '/activity',
          request,
        );
        if (!response.data.id) {
          throw new Error('Intento fallido de creacion');
        }
        if (activity.images) {
          if (activity.images.length > 0) {
            const error = await uploadImages(
              activity.images as Asset[],
              response.data.id!,
            );
            if (!error) throw new Error('falló todo');
          }
        }
        return response.status;
      } catch (error: any | AxiosError) {
        console.log(' ---------- ERROR ----------- ');
        console.log(error);
        console.log(JSON.stringify(error, null, 5));
        return 0;
      }
    } else {
      return activityImpurities;
    }
  };
  const updateActivity = async (id: number) => {
    const activityImpurities = validateUpdateActivityBody(activity);
    const request = parseUpdateActivityBody({...activity});
    if (activityImpurities.length < 1) {
      try {
        const response = await sagiApi.put<ActivityListItemData>(
          '/activity/' + id,
          request,
        );
        return response.status;
      } catch (error: any | AxiosError) {
        console.log(' ---------- ERROR ----------- ');
        console.log(JSON.stringify(error, null, 5));
        return 0;
      }
    } else {
      return activityImpurities;
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      const response = await sagiApi.delete('/activity/' + id);
      if (response.status === 200) return true;
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const undoDeleteActivity = async (id: number) => {
    try {
      const response = await sagiApi.delete('/activity/' + id + '/undo');
      if (response.status === 200) return true;
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const loadActivityControlData = async (id: number) => {
    try {
      const response = await sagiApi.get<ActivityControlData>(
        '/activity/' + id,
      );
      const {viewport} = await reverseGeocode(response.data.location);
      const act = parseActivityObjectDates(response.data);
      setActivity({
        ...act,
        location: {
          ...act.location,
          viewport: viewport,
        },
      });
      return true;
    } catch (error: any | AxiosError) {
      console.log(' ---------- ERROR ----------- ');
      console.log(JSON.stringify(error, null, 5));
      return false;
    }
  };

  const uploadImages = async (assets: Asset[], id: number) => {
    try {
      const images = multiformDataImages(assets, id);
      const imgResponse = await sagiApi.put<UploadImageResponse[]>(
        '/image/activity',
        images,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return true;
    } catch (error) {
      console.log(JSON.stringify(error, null, 5));
      return false;
    }
  };

  const deleteImage = async (id: number) => {
    try {
      const response = await sagiApi.delete<any>('/image/' + id);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const addActivityOwner = async () => {
    console.log('not implemented!');
  };

  return (
    <CreatedActivitiesContext.Provider
      value={{
        activities,
        loadActivities,
        addActivity,
        updateActivity,
        deleteActivity,
        loadActivityControlData,
        uploadImages,
        deleteImage,
        addActivityOwner,
        undoDeleteActivity,
        setActivity,
        activity,
        setActivityField,
        setMultipleActivityField,
        clearActivity,
      }}>
      {children}
    </CreatedActivitiesContext.Provider>
  );
};
