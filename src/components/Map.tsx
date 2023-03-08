/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {parseDisciplinesString} from '../helpers/stringParser';
import useLocation from '../hooks/useLocation';
import {ActivityMapMarkerData} from '../interfaces/ActivityInterfaces';
import {Location} from '../interfaces/LocationInterfaces';
import LoadingScreen from '../screens/LoadingScreen';
import mapStyleObject from '../theme/mapStyleObject';
interface Props {
  onPressMarker: (index: number) => void;
  markers?: ActivityMapMarkerData[];
}

export const Map = ({markers, onPressMarker}: Props) => {
  const {hasLocation, initialPosition} = useLocation();
  const mapViewRef = useRef<MapView>();

  const renderMarkers = () => {
    return markers?.map((data, index) => {
      // console.debug('actividad ' + data.id);
      // console.debug('lat: ' + data.latitude);
      // console.debug('lng: ' + data.longitude);
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: data.latitude,
            longitude: data.longitude,
          }}
          onPress={event => onPressMarker(index)}
        />
      );
    });
  };

  if (!hasLocation) return <LoadingScreen />;

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        customMapStyle={mapStyleObject}
        initialRegion={{
          latitude: initialPosition.lat,
          longitude: initialPosition.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        rotateEnabled={false}>
        {renderMarkers()}
      </MapView>
    </>
  );
};
