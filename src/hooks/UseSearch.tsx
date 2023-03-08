import {useContext, useEffect, useState} from 'react';
import {
  ActivityMapMarkerData,
  SearchActivityRequestData,
} from '../interfaces/ActivityInterfaces';
import {useForm} from './useForm';
import {ActivityContext} from '../context/ActivityContext';

const useSearch = () => {
  const {getAllActivities} = useContext(ActivityContext);
  const [open, setOpen] = useState(false);

  const {
    form: filters,
    setFormValue: setFilters,
    clearForm: clearFilters,
  } = useForm({} as SearchActivityRequestData);

  const search = async () => {
    return getAllActivities(filters);
  };

  return {
    open,
    setOpen,
    filters,
    setFilters,
    clearFilters,
    search,
  };
};

export default useSearch;
