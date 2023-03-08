import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import {AuthProvider} from './src/context/AuthContext';
import {DisciplineProvider} from './src/context/DisciplineContext';
import {CreatedActivitiesProvider} from './src/context/CreatedActivitiesContext';
import {PermissionProvider} from './src/context/PermissionContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ActivityProvider} from './src/context/ActivityContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AppContextContainer>
          <AuthStackNavigator />
        </AppContextContainer>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const AppContextContainer = ({children}: any) => {
  return (
    <PermissionProvider>
      <AuthProvider>
        <DisciplineProvider>
          <CreatedActivitiesProvider>
            <ActivityProvider>{children}</ActivityProvider>
          </CreatedActivitiesProvider>
        </DisciplineProvider>
      </AuthProvider>
    </PermissionProvider>
  );
};

export default App;
