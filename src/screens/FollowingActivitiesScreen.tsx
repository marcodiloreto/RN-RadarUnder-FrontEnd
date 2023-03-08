import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useContext} from 'react';
import {ActivityTopTabsParams} from '../navigators/ActivityTopTabsNavigator';
import {ActivityListItemData} from '../interfaces/ActivityInterfaces';
import ActivityCard from '../components/ActivityCard';
import {ActivityContext} from '../context/ActivityContext';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import UseInterestedActivitiesHandler from '../hooks/InterestedActivitiesHandler';
import CollapsibleList from '../components/CollapsibleList';
import {ScrollView} from 'react-native-gesture-handler';

interface Props
  extends MaterialTopTabScreenProps<
    ActivityTopTabsParams,
    'FollowingActivitiesScreen'
  > {}
const CreatedActivitiesScreen = ({navigation}: Props) => {
  const {inscribed, liked, loadActivities} = UseInterestedActivitiesHandler();

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
    <>
      <ScrollView>
        <CollapsibleList
          title="Anotado/a"
          titleStyle={styles.headerTitle}
          containerStyle={styles.headerContainer}
          data={inscribed}
          renderItem={({item}) => (
            <ActivityCard item={item} sendDetails={sendDetails} />
          )}
          // ListHeaderComponent={() => <ListHeader title="Estas Anotado/a en:" />}
          ListEmptyComponent={() => (
            <EmptyList text="No estás anotado en ninguna actividad" />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={{height: 20}} />}
        />

        <CollapsibleList
          title="Guardadas"
          titleStyle={styles.headerTitle}
          containerStyle={styles.headerContainer}
          data={liked}
          renderItem={({item}) => (
            <ActivityCard item={item} sendDetails={sendDetails} />
          )}
          ListEmptyComponent={() => (
            <EmptyList text="No estás anotado en ninguna actividad" />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={{height: 20}} />}
        />
      </ScrollView>
    </>
  );
};
interface EmptyListProps {
  text: string;
}

const EmptyList = ({text}: EmptyListProps) => {
  return (
    <Text
      style={{
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 20,
      }}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  headerContainer: {
    width: '100%',
    elevation: 10,
    borderRadius: 3,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F4',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F4',
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginVertical: 10,
  },
});
export default CreatedActivitiesScreen;
