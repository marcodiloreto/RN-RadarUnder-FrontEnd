import {createContext, Dispatch, SetStateAction, useState} from 'react';
import sagiApi from '../api/sagiApi';
import {parseActivityResponseDates} from '../helpers/dateParser';
import {parseFiltersGetRequest} from '../helpers/RequestBodyParsing';
import {
  ActivityDetails,
  ActivityListItemData,
  ActivityMapMarkerData,
  SearchActivityRequestData,
} from '../interfaces/ActivityInterfaces';

export type ActivitycontextProps = {
  Activity: ActivityDetails;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getAllActivities: (
    filters: SearchActivityRequestData,
  ) => Promise<ActivityMapMarkerData[]>;
  setActivity: (activity: ActivityDetails) => void;
  extendDetails: (
    activity: ActivityListItemData | ActivityMapMarkerData,
  ) => void;
  saveActivity: (
    relation: 'INSCRIBED' | 'LIKE',
  ) => Promise<boolean | undefined>;
};

export const ActivityContext = createContext({} as ActivitycontextProps);

export const ActivityProvider = ({children}: any) => {
  const [Activity, setActivity] = useState({} as ActivityDetails);
  const [loading, setLoading] = useState(false);

  const extendDetails = async (
    activity: ActivityListItemData | ActivityMapMarkerData,
  ) => {
    try {
      setLoading(true);
      const response = await sagiApi.get<{
        email: string;
        phone: string;
        images: {url: string}[];
        description: string;
      }>('/activity/details/' + activity.id);
      setActivity({...activity, ...response.data});
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllActivities = async (filters: SearchActivityRequestData) => {
    const params = parseFiltersGetRequest(filters);
    try {
      const response = await sagiApi.get<ActivityMapMarkerData[]>(
        '/activity' + params,
      );
      const results = response.data.map(activity => {
        return parseActivityResponseDates(activity);
      });
      return results;
    } catch (e) {
      console.log;
      return [{} as ActivityMapMarkerData];
    }
  };

  const saveActivity = async (relation: 'INSCRIBED' | 'LIKE') => {
    try {
      const response = await sagiApi.put<boolean>(
        '/activity/' + relation + '/' + Activity.id,
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        Activity,
        setActivity,
        extendDetails,
        getAllActivities,
        loading,
        setLoading,
        saveActivity,
      }}>
      {children}
    </ActivityContext.Provider>
  );
};
