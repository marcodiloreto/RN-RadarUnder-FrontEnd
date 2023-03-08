import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {parseDateString, parseTimeString} from '../helpers/dateParser';
import {
  parseDisciplinesString,
  parsePriceText,
  parseWeekString,
  removeArgentina,
} from '../helpers/stringParser';
import {ActivityMapMarkerData} from '../interfaces/ActivityInterfaces';
import UserDefault from './UserDefault';

interface RenderItemProps {
  data: ActivityMapMarkerData;
  go: () => void;
  close: () => void;
}

const ActivityMapCard = ({data, go, close}: RenderItemProps) => {
  const ifPlan = (): JSX.Element | JSX.Element[] => {
    if (data.plan.length > 0) {
      return data.plan.map((p, index) => {
        return (
          <View key={index} style={{flexDirection: 'row'}}>
            <Text>{parseWeekString(p.days)}</Text>
            <View style={{flex: 1}} />
            <Text>
              De {parseTimeString(p.startTime)} A {parseTimeString(p.endTime)}
            </Text>
          </View>
        );
      });
    } else {
      return (
        <Text style={{alignSelf: 'center'}}>
          El {parseDateString(data.startDate)} De{' '}
          {parseTimeString(data.startDate)} A {parseTimeString(data.endDate)}
        </Text>
      );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        go();
      }}
      style={styles.container}>
      <>
        <View style={styles.closeButton}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 40,
            }}
            activeOpacity={0.8}
            onPress={close}>
            <Icon name="chevron-down-outline" size={25} color="#d4d4d4" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.title}>{data.name}</Text>
            <View style={{flex: 1}} />
            <Text style={styles.disciplineText}>
              {parseDisciplinesString(data.disciplines)}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              flexDirection: 'row',
            }}>
            <View style={styles.imageContainer}>
              {data.createdBy[0].profilePic ? (
                <Image
                  style={styles.image}
                  source={{uri: data.createdBy[0].profilePic.url}}
                />
              ) : (
                <View style={styles.image}>
                  <UserDefault name={data.createdBy[0].name} />
                </View>
              )}
            </View>
            <Text style={styles.userText}>
              {data.createdBy[0].name + ' ' + data.createdBy[0].lastName}
            </Text>
            <View style={{flex: 1}} />
            <Icon name="man" size={34} color="black" />
            <Text style={styles.quotaText}>
              {data.maxQuota === -1
                ? data.enrolled
                : data.enrolled + '/' + data.maxQuota}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <View style={{flex: 4}}>
              <Text style={styles.priceText}>{parsePriceText(data.price)}</Text>
            </View>
            <View
              style={{
                flex: 15,
                marginLeft: 10,
                overflow: 'hidden',
              }}>
              <Text
                style={styles.addressText}
                adjustsFontSizeToFit
                numberOfLines={2}
                ellipsizeMode="tail">
                {removeArgentina(data.address)}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              marginBottom: 15,
            }}>
            {ifPlan()}
          </View>
        </View>
      </>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    width: '95%',
    bottom: 10,
  },
  separator: {
    width: 10,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'lightgrey',
  },
  flatlistBorder: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1.5,
    borderRadius: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: '500',
    color: 'black',
    marginLeft: 10,
  },
  disciplineText: {
    fontSize: 15,
    alignSelf: 'flex-end',
    marginBottom: 3,
    marginRight: 4,
  },
  userText: {
    fontSize: 16,
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginLeft: 8,
  },
  quotaText: {
    fontSize: 29,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginBottom: 3,
    marginRight: 4,
  },
  addressText: {fontSize: 12, alignSelf: 'flex-end'},
  priceText: {
    fontSize: 14,
    color: 'black',
  },
  imageContainer: {
    borderRadius: 30,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 36,
    height: 36,
  },
  deletedActivity: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#d4f5d4',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ActivityMapCard;
