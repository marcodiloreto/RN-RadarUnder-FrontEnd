import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import SearchScreen from '../screens/SearchScreen';
import LoadingScreen from '../screens/LoadingScreen';
import BottomTabsNavigator from './BottomTabsNavigator';
import CreateActivityScreen from '../screens/CreateActivityCarouselScreen';
import AppStackNavigator from './AppStackNavigator';

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  AppStackNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const AuthStackNavigator = () => {
  const {status} = useContext(AuthContext);
  console.log(status);
  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
      }}>
      {status === 'authenticated' ? (
        <Stack.Screen name="AppStackNavigator" component={AppStackNavigator} />
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
