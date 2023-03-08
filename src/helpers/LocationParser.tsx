import {
  Address,
  Location,
  GeocodeResults,
} from '../interfaces/LocationInterfaces';

export const parseFromLocationObject = (loc: Location) => {
  return {
    longitude: loc.lng,
    latitude: loc.lat,
  };
};

export const parseToLocationObject = (loc: {
  latitude: number;
  longitude: number;
}) => {
  return {
    lat: loc.latitude,
    lng: loc.longitude,
  };
};

export const makeAddressObject = (
  address: string,
  result: GeocodeResults,
): Address => {
  return {
    address,
    lat: result.location.lat,
    lng: result.location.lng,
    viewport: result.viewport,
  };
};
