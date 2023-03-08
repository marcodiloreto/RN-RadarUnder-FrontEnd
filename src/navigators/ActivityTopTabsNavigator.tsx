import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FollowingActivitiesScreen from '../screens/FollowingActivitiesScreen';
import CreatedActivitiesScreen from '../screens/CreatedActivitiesScreen';
import SectionHeader from '../components/SectionHeader';

export type ActivityTopTabsParams = {
  CreatedActivitiesScreen: undefined;
  FollowingActivitiesScreen: undefined;
};

const Tab = createMaterialTopTabNavigator<ActivityTopTabsParams>();

const ActivityTopTabsNavigator = () => {
  return (
    <>
      <SectionHeader title="Mis Actividades" />
      <Tab.Navigator
        backBehavior="history"
        initialRouteName="FollowingActivitiesScreen"
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor: '#EEAC87',
          },
          //TODO: estilos de esta tabBar
        }}>
        <Tab.Screen
          /*TODO: esta tab se achica o se agranda según si el usuario tiene o 
        no actividades creadas, si no tiene el título es solo un icono de +,
        bien chiquito a la izquierda */
          name="CreatedActivitiesScreen" //asd!
          component={CreatedActivitiesScreen}
          options={{
            title: 'Creadas',
          }}
        />
        <Tab.Screen
          name="FollowingActivitiesScreen"
          component={FollowingActivitiesScreen}
          options={{
            title: 'Siguiendo',
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default ActivityTopTabsNavigator;
