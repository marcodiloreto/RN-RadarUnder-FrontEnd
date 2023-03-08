import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {AppStackParams} from '../navigators/AppStackNavigator';
import {ActivityContext} from '../context/ActivityContext';
import {CreatedActivitiesContext} from '../context/CreatedActivitiesContext';
import LoadingScreen from './LoadingScreen';
import SectionHeader from '../components/SectionHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {ScaledImage} from '../components/ScaledImage';
import {
  parseWeekString,
  removeArgentina,
  parsePriceText,
  parseDisciplinesString,
} from '../helpers/stringParser';
import {parseDateString, parseTimeString} from '../helpers/dateParser';
import {AuthContext} from '../context/AuthContext';
import {validateUserOwnership} from '../helpers/identityValidators';
import SectionHeaderEditable from '../components/SectionHeaderEditable';
import UserDefault from '../components/UserDefault';

interface Props extends StackScreenProps<AppStackParams, 'ActivityScreen'> {}

const ActivityScreen = ({navigation}: Props) => {
  const {Activity, loading, saveActivity} = useContext(ActivityContext);
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const {loadActivityControlData, deleteActivity, undoDeleteActivity} =
    useContext(CreatedActivitiesContext);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      setIsOwner(validateUserOwnership(Activity.createdBy, Number(user!.id)));
    }
  }, [loading]);

  const editData = async (id: number) => {
    const okay = await loadActivityControlData(id);
    if (!okay) {
      Alert.alert(
        'No se pudo encontrar la actividad en el servidor, ¿tal vez haya sido eliminada?',
      );
      return;
    }
    navigation.navigate('CreateActivityCarouselScreen');
  };

  const erase = async (id: number) => {
    const okay = await deleteActivity(id);
    if (!okay) {
      Alert.alert(
        'No se pudo eliminar la actividad, ¿tal vez ya haya sido eliminada?',
      );
      return;
    }
    navigation.goBack();
  };

  const undoErase = async (id: number) => {
    const okay = await undoDeleteActivity(id);
    if (!okay) {
      Alert.alert('Error en el servidor. No se pudo restablecer actividad');
      return;
    }
    navigation.goBack();
  };

  const alert = (ok: boolean, action: 'inscribe' | 'like') => {
    if (ok && action === 'inscribe') {
      return Alert.alert(
        'Anotado a la actividad',
        "añadido a la sección 'mis actividades'",
      );
    }
    if (ok && action === 'like') {
      return Alert.alert(
        'Actividad guardada',
        "añadido a la sección 'mis actividades'",
      );
    }
    if (!ok) {
      return Alert.alert(
        'Error',
        'No puedes anotarte o likear unar actividad que es tuya',
      );
    }
  };

  const ifPlan = (): JSX.Element | JSX.Element[] => {
    if (Activity.plan.length > 0) {
      return Activity.plan.map((p, index) => {
        return (
          <View
            key={index}
            style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Text
                style={{...styles.cardText, flexWrap: 'wrap', marginLeft: 5}}>
                {parseWeekString(p.days)}
              </Text>
            </View>
            <Text style={{...styles.cardText, marginLeft: 15}}>
              De {parseTimeString(p.startTime)} A {parseTimeString(p.endTime)}
            </Text>
          </View>
        );
      });
    } else {
      return (
        <Text style={{alignSelf: 'center', ...styles.cardText}}>
          El {parseDateString(Activity.startDate)} De{' '}
          {parseTimeString(Activity.startDate)} A{' '}
          {parseTimeString(Activity.endDate)}
        </Text>
      );
    }
  };

  if (loading) return <LoadingScreen />;

  if (Activity.deleted) {
    return (
      <>
        <SectionHeader
          title="Actividad"
          button
          goBack={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 20,
              fontWeight: 'bold',
              marginTop: 140,
            }}>
            Esta actividad fue eliminada
          </Text>
          <Button
            title="Reestablecer"
            onPress={() => undoErase(Activity.id)}
            color={'#a85020'}
          />
        </View>
      </>
    );
  }

  return (
    <>
      {isOwner ? (
        <SectionHeaderEditable
          title="Actividad"
          goBack={() => {
            navigation.goBack();
          }}
          edit={() => editData(Activity.id)}
          erase={() => erase(Activity.id)}
        />
      ) : (
        <SectionHeader
          title="Actividad"
          button
          goBack={() => {
            navigation.goBack();
          }}
        />
      )}
      <View style={styles.cardHead}>
        <Text style={styles.title}>{Activity.name}</Text>

        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <View style={styles.imageContainer}>
            {Activity.createdBy[0].profilePic ? (
              <Image
                style={styles.image}
                source={{uri: Activity.createdBy[0].profilePic.url}}
              />
            ) : (
              <View style={styles.image}>
                <UserDefault name={Activity.createdBy[0].name} />
              </View>
            )}
          </View>
          <Text style={styles.userText}>
            {Activity.createdBy[0].name + ' ' + Activity.createdBy[0].lastName}
          </Text>
          <View style={{flex: 1}} />
        </View>
        <View style={styles.flatlistContainer}>
          <FlatList
            style={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Activity.images}
            renderItem={({item}) => {
              return <ImageItem url={item.url} />;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
          />
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View>
              <Icon name="time-outline" size={50} color={'black'} />
            </View>
            {ifPlan()}
          </View>
        </View>
        <View
          style={{height: 1, backgroundColor: 'rgba(0,0,0,0.2)', marginTop: 15}}
        />
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <Icon name="location-outline" size={50} color={'black'} />
            <Text style={{marginLeft: 5, ...styles.cardText}}>
              {removeArgentina(Activity.address)}
            </Text>
          </View>
        </View>
        <View
          style={{height: 1, backgroundColor: 'rgba(0,0,0,0.2)', marginTop: 15}}
        />
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginHorizontal: 10}}>
                <Icon name="logo-usd" size={30} color={'black'} />
              </View>
              <Text style={{marginLeft: 5, ...styles.cardText}}>
                {parsePriceText(Activity.price)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text style={styles.quotaText}>
                {Activity.maxQuota === -1
                  ? Activity.enrolled
                  : Activity.enrolled + '/' + Activity.maxQuota}
              </Text>
              <Icon name="man" size={34} color="black" />
            </View>
          </View>
        </View>
        <View
          style={{height: 1, backgroundColor: 'rgba(0,0,0,0.2)', marginTop: 15}}
        />
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <Icon5 name="running" color={'black'} size={45} />
            <Text style={{...styles.cardText, marginLeft: 15}}>
              {parseDisciplinesString(Activity.disciplines)}
            </Text>
          </View>
        </View>
        <View
          style={{height: 1, backgroundColor: 'rgba(0,0,0,0.2)', marginTop: 15}}
        />
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginHorizontal: 10}}>
                <Icon name="call-outline" size={30} color={'black'} />
              </View>
              <Text style={styles.cardText}>{Activity.phone}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="mail-outline" size={30} color="black" />
              <Text style={{marginLeft: 5, ...styles.cardText}}>
                {Activity.email}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{height: 1, backgroundColor: 'rgba(0,0,0,0.2)', marginTop: 15}}
        />
        <View style={{margin: 20}}>
          <Text style={{flexWrap: 'wrap', ...styles.descText}}>
            {Activity.description}
          </Text>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      {!isOwner ? (
        <>
          <TouchableHighlight
            onPress={async () => {
              const isSaved = await saveActivity('LIKE');
              if (typeof isSaved === 'undefined') return;
              alert(isSaved, 'like');
            }}
            style={styles.likeButton}
            underlayColor={'#ECFFDC'}>
            {isLiked ? (
              <Icon
                name="heart"
                color={'#4CBB17'}
                size={28}
                style={{paddingTop: 4}}
              />
            ) : (
              <Icon
                name="heart-outline"
                color={'#839192'}
                size={28}
                style={{paddingTop: 4}}
              />
            )}
          </TouchableHighlight>
          <TouchableOpacity
            style={styles.appointButton}
            onPress={async () => {
              const isSaved = await saveActivity('INSCRIBED');
              if (typeof isSaved === 'undefined') return;
              alert(isSaved, 'inscribe');
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '600',
                marginHorizontal: 15,
              }}>
              Anotarme
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
    </>
  );
};

interface ImageProps {
  url: string;
}

const ImageItem = ({url}: ImageProps) => {
  const height = 196;
  const scale = {
    height,
    //width: (height * 4) / 3,
    elevation: 7,
    borderRadius: 20,
  };
  return (
    <View style={{marginVertical: 10}}>
      <ScaledImage url={url} containerScale={scale} />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    width: 0,
    marginHorizontal: 10,
  },
  flatlistContainer: {
    overflow: 'hidden',
  },
  cardHead: {
    backgroundColor: 'white',
    margin: 0,
    paddingBottom: 5,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: 'black',
    marginLeft: 20,
    marginTop: 10,
  },
  imageContainer: {
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 40,
    height: 40,
  },
  userText: {
    fontSize: 19,
    alignSelf: 'flex-end',
    marginBottom: 6,
    marginLeft: 8,
  },
  cardText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.9)',
  },
  descText: {
    fontSize: 18,
    color: 'black',
  },
  quotaText: {
    fontSize: 23,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginBottom: 3,
    marginRight: 4,
  },
  likeButton: {
    height: 44,
    width: 44,
    borderRadius: 56,
    position: 'absolute',
    backgroundColor: 'white',
    elevation: 5,
    bottom: 90,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F2F3F4',
  },
  appointButton: {
    padding: 12,
    backgroundColor: '#002D62',
    position: 'absolute',
    bottom: 20,
    right: 30,
    borderRadius: 25,
  },
});

export default ActivityScreen;
