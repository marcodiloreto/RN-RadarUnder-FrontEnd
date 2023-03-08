import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DisciplineListScreen from '../screens/DisciplineListScreen';
import SearchScreen from '../screens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import SectionHeader from '../components/SectionHeader';
import {permissionContext} from '../context/PermissionContext';
import LoadingScreen from '../screens/LoadingScreen';
import {PermissionScreen} from '../screens/PermissionScreen';
import ActivityTopTabsNavigator from './ActivityTopTabsNavigator';

export type BottomTabsParams = {
  SearchScreen: undefined;
  ActivityTopTabsNavigator: undefined;
  DisciplineListScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParams>();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{
        tabBarStyle: {
          height: 50,
        },
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor: '#E77536',
        tabBarActiveBackgroundColor: '#FFB68E',
        tabBarActiveTintColor: '#F4EBD9',
        tabBarInactiveTintColor: '#73391B',
        tabBarHideOnKeyboard: true,
      }}
      backBehavior="history">
      <Tab.Screen
        name="ActivityTopTabsNavigator"
        component={ActivityTopTabsNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="file-tray-full" color={color} size={45} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="compass" color={color} size={45} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="DisciplineListScreen"
        component={DisciplineListScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={{transform: [{rotate: '90deg'}]}}>
              <Icon name="git-branch-outline" color={color} size={45} />
            </View>
          ),
          header: props => <SectionHeader title="Disciplinas" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
