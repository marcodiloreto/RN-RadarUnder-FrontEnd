import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FloatingButton from '../components/FloatingButton';
import {useContext} from 'react';
import {CreatedActivitiesContext} from '../context/CreatedActivitiesContext';
import {ActivityTopTabsParams} from '../navigators/ActivityTopTabsNavigator';
import {ActivityListItemData} from '../interfaces/ActivityInterfaces';
import ActivityCard from '../components/ActivityCard';
import {ActivityContext} from '../context/ActivityContext';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

interface Props
  extends MaterialTopTabScreenProps<
    ActivityTopTabsParams,
    'CreatedActivitiesScreen'
  > {}
const CreatedActivitiesScreen = ({navigation}: Props) => {
  const {activities, loadActivities, clearActivity} = useContext(
    CreatedActivitiesContext,
  );

  const {extendDetails} = useContext(ActivityContext);

  const [refreshing, setRefreshing] = useState(false);

  const sendDetails = async (activity: ActivityListItemData) => {
    extendDetails(activity);
    navigation.getParent()!.navigate('ActivityScreen');
  };

  useEffect(() => {
    setRefreshing(true);
    navigation.addListener('focus', () => {
      loadActivities();
    });
    setRefreshing(false);
  }, []);

  if (refreshing) {
    return (
      <>
        <View style={{marginTop: 80, alignSelf: 'center'}}>
          <ActivityIndicator size={40} color={'black'} />
        </View>
      </>
    );
  }

  return (
    //TODO: estilos baby!
    <>
      {activities.length > 0 ? (
        <FlatList
          data={activities}
          renderItem={({item}) => (
            <ActivityCard item={item} sendDetails={sendDetails} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={{height: 115}} />}
        />
      ) : (
        <Text style={{marginTop: 80, fontSize: 16, alignSelf: 'center'}}>
          No has creado ninguna actividad
        </Text>
      )}

      <FloatingButton
        title="+"
        onPress={() => {
          clearActivity();
          // @ts-ignore
          navigation.navigate('AppStackNavigator', {
            screen: 'CreateActivityCarouselScreen',
          });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 6,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'lightgrey',
  },
});
export default CreatedActivitiesScreen;
