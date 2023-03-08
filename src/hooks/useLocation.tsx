import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {
  Address,
  AutocompleteResult,
  Location,
} from '../interfaces/LocationInterfaces';
import api from '../api/sagiApi';
import {GeocodeResults} from '../interfaces/LocationInterfaces';
import {DrawerContentScrollView} from '@react-navigation/drawer';
const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);

  const [initialPosition, setInitialPosition] = useState<Location>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    getCurrentPosition().then(coords => {
      setInitialPosition(coords);
      setHasLocation(true);
    });
  }, []);

  const getCurrentPosition = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        },
        err => {
          reject(err);
        },
        {enableHighAccuracy: true},
      );
    });
  };

  const autocompletePlaces = async (term: string, location: Location) => {
    return api.get<AutocompleteResult[]>(
      `/googleApi/autocomplete?term=${term}&lat=${location.lat}&lng=${location.lng}`,
    );
  };

  const geocode = async (placeId: string) => {
    return await api.get<GeocodeResults>(`/googleApi/geocode?place=${placeId}`);
  };

  const reverseGeocode = async (location: Location) => {
    const resp = await api.get<Address>(
      `/googleApi/reverseGeocode?lat=${location.lat}&lng=${location.lng}`,
    );
    return resp.data;
  };

  const setupRegion = (address: Address | undefined) => {
    if (address) {
      var latitude = address.lat;
      var longitude = address.lng;
      var latitudeDelta =
        address.viewport!.northeast.lat - address.viewport!.southwest.lat;
      var longitudeDelta = latitudeDelta * (380 / 500);
      return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      };
    } else {
      return {
        latitude: -38.416097,
        longitude: -63.61667199999999,
        latitudeDelta: -21.7810459 - -55.1220541,
        longitudeDelta: 200 / 600,
      };
    }
  };

  return {
    hasLocation,
    initialPosition,
    getCurrentPosition,
    autocompletePlaces,
    geocode,
    reverseGeocode,
    setupRegion,
  };
};

export default useLocation;
