import React, {useCallback, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {useForm} from '../hooks/useForm';
import {
  ActivityMapMarkerData,
  SearchActivityRequestData,
} from '../interfaces/ActivityInterfaces';
import UserButton from './UserButton';
import FiltersModal from './FiltersModal';
import useSearch from '../hooks/UseSearch';

interface Props {
  setMarkers: (results: ActivityMapMarkerData[]) => void;
}

const SearchInput = ({setMarkers}: Props) => {
  const {filters, setFilters, open, setOpen, clearFilters, search} =
    useSearch();

  const fetchData = async () => {
    const data = await search();
    setMarkers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TouchableHighlight
        style={styles.searchBox}
        activeOpacity={0.1}
        underlayColor={'#FFB68E'}
        onPress={() => setOpen(true)}>
        <>
          <TouchableOpacity
            style={styles.filtersButton}
            activeOpacity={0.8}
            onPress={() => setOpen(true)}>
            <Icon name="filter" size={25} style={{paddingTop: 7}} />
          </TouchableOpacity>
          <TextInput
            placeholder="Búsqueda por nombre"
            editable={false}
            value={filters.term}
            style={{color: 'black', marginLeft: 10, fontSize: 17}}
          />
        </>
      </TouchableHighlight>
      <FiltersModal
        open={open}
        close={() => setOpen(false)}
        filters={filters}
        setFilters={setFilters}
        reset={clearFilters}
        search={fetchData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    marginHorizontal: 10,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
    flex: 1,
    elevation: 10,
    flexDirection: 'row',
  },

  filtersButton: {
    alignSelf: 'center',
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 5,
    backgroundColor: '#FFB68E',
    marginLeft: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchInput;
