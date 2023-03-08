import React, {useContext, useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Map} from '../components/Map';
import SearchInput from '../components/SearchInput';
import {permissionContext} from '../context/PermissionContext';
import UserModal from '../components/UserModal';
import UserButton from '../components/UserButton';
import {ActivityMapMarkerData} from '../interfaces/ActivityInterfaces';
import ActivityMapCard from '../components/ActivityMapCard';
import {ActivityContext} from '../context/ActivityContext';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabsParams} from '../navigators/BottomTabsNavigator';

interface Props
  extends BottomTabScreenProps<BottomTabsParams, 'SearchScreen'> {}

const SearchScreen = ({navigation}: Props) => {
  const {permission, requestLocationPermission} = useContext(permissionContext);
  const {extendDetails} = useContext(ActivityContext);
  const [markers, setMarkers] = useState<ActivityMapMarkerData[]>([]);
  const [open, setOpen] = useState(false);
  const [markerIndex, setMarkerIndex] = useState<number | undefined>(undefined);

  const opposite = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (markers.length < 1) {
      setMarkerIndex(undefined);
    }
  }, [markers]);

  const selectActivity = () => {
    extendDetails(markers[markerIndex!]);
    // @ts-ignore
    navigation.navigate('ActivityScreen');
  };

  useEffect(() => {
    if (permission.location !== 'granted') requestLocationPermission();
  }, []);

  const activityCard = useCallback(() => {
    if (typeof markerIndex === 'undefined') return;
    return (
      <ActivityMapCard
        data={markers[markerIndex]}
        go={selectActivity}
        close={() => {
          setMarkerIndex(undefined);
        }}
      />
    );
  }, [markerIndex]);

  return (
    <>
      <View style={StyleSheet.absoluteFill}>
        <Map
          markers={markers}
          onPressMarker={(index: number) => {
            setMarkerIndex(index);
          }}
        />
      </View>
      <View style={{flexDirection: 'row', height: 45, marginTop: 60}}>
        <SearchInput setMarkers={setMarkers} />
        <UserButton modalManage={opposite} />
      </View>
      {activityCard()}
      <UserModal
        open={open}
        close={() => setOpen(false)}
        navigation={navigation}
      />
    </>
  );
};

export default SearchScreen;
