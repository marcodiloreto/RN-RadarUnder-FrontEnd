import {createElement, useEffect, useState} from 'react';
import sagiApi from '../api/sagiApi';
import {parseActivityResponseDates} from '../helpers/dateParser';
import {
  ActivityListItemData,
  InterestedActivitiesResponse,
} from '../interfaces/ActivityInterfaces';

type HandlerReturnValues = {
  liked: ActivityListItemData[];
  inscribed: ActivityListItemData[];
  loadActivities: () => Promise<void>;
};

const UseInterestedActivitiesHandler = (): HandlerReturnValues => {
  const [liked, setLiked] = useState<ActivityListItemData[]>([]);
  const [inscribed, setInscribed] = useState<ActivityListItemData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const {data} = await sagiApi.get<InterestedActivitiesResponse>(
        '/activity/interested',
      );
      const parsedData = {
        liked: data.liked.map(el => parseActivityResponseDates(el)),
        inscribed: data.inscribed.map(el => parseActivityResponseDates(el)),
      };
      setLiked(parsedData.liked);
      setInscribed(parsedData.inscribed);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    liked,
    inscribed,
    loadActivities,
  };
};

export default UseInterestedActivitiesHandler;
