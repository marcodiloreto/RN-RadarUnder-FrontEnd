import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateActivityCarouselScreen from '../screens/CreateActivityCarouselScreen';
import {CreatedActivitiesProvider} from '../context/CreatedActivitiesContext';
import ActivityScreen from '../screens/ActivityScreen';
import BottomTabsNavigator from './BottomTabsNavigator';
import ModifyUserDataScreen from '../screens/ModifyUserDataScreen';
import RequestScreen from '../screens/RequestScreen';
import DisciplineScreen from '../screens/DisciplineScreen';
import {permissionContext} from '../context/PermissionContext';
import LoadingScreen from '../screens/LoadingScreen';
import {PermissionScreen} from '../screens/PermissionScreen';

export type AppStackParams = {
  BottomTabsNavigator: undefined;
  CreateActivityCarouselScreen: undefined;
  ActivityScreen: undefined;
  ModifyUserDataScreen: {id: number};
  RequestScreen: undefined;
  DisciplineScreen: {id: number};
};

const Stack = createStackNavigator<AppStackParams>();

const AppStackNavigator = () => {
  const {permission} = useContext(permissionContext);

  if (permission.location === 'unavailable') return <LoadingScreen />;

  if (permission.location !== 'granted') return <PermissionScreen />;

  return (
    <CreatedActivitiesProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen
          name="BottomTabsNavigator"
          component={BottomTabsNavigator}
        />
        <Stack.Screen
          name="CreateActivityCarouselScreen"
          component={CreateActivityCarouselScreen}
        />
        <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
        <Stack.Screen
          name="ModifyUserDataScreen"
          component={ModifyUserDataScreen}
        />
        <Stack.Screen name="RequestScreen" component={RequestScreen} />
        <Stack.Screen name="DisciplineScreen" component={DisciplineScreen} />
      </Stack.Navigator>
    </CreatedActivitiesProvider>
  );
};

export default AppStackNavigator;
