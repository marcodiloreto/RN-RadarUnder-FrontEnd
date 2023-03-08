import React, {createContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export interface PermissionState {
  location: PermissionStatus;
}

export const contextInitState: PermissionState = {
  location: 'unavailable',
};

type PermissionContextProps = {
  permission: PermissionState;
  checkLocationPermission: () => void;
  requestLocationPermission: () => void;
};

export const permissionContext = createContext({} as PermissionContextProps);

export const PermissionProvider = ({children}: any) => {
  const [permission, setPermission] = useState(contextInitState);

  useEffect(() => {
    const listener = AppState.addEventListener('change', state => {
      if (state === 'active') checkLocationPermission();
    });

    return () => {
      listener.remove();
    };
  });

  const checkLocationPermission = async () => {
    if (Platform.OS !== 'android') return;

    const response = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    setPermission({...permission, location: response});
  };

  const requestLocationPermission = async () => {
    if (Platform.OS !== 'android') return;

    const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (response === 'blocked') openSettings();
    setPermission({...permission, location: response});
  };

  return (
    <permissionContext.Provider
      value={{
        permission,
        checkLocationPermission,
        requestLocationPermission,
      }}>
      {children}
    </permissionContext.Provider>
  );
};
