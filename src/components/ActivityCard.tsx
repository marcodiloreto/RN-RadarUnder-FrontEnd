import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {parseDateString, parseTimeString} from '../helpers/dateParser';
import {
  parseDisciplinesString,
  parsePriceText,
  parseWeekString,
  removeArgentina,
} from '../helpers/stringParser';
import {ActivityListItemData} from '../interfaces/ActivityInterfaces';
import UserDefault from './UserDefault';

interface RenderItemProps {
  item: ActivityListItemData;
  sendDetails: (item: ActivityListItemData) => void;
}

const ActivityCard = ({item, sendDetails}: RenderItemProps) => {
  const ifPlan = (): JSX.Element | JSX.Element[] => {
    if (item.plan.length > 0) {
      return item.plan.map((p, index) => {
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
          El {parseDateString(item.startDate)} De{' '}
          {parseTimeString(item.startDate)} A {parseTimeString(item.endDate)}
        </Text>
      );
    }
  };

  return (
    <TouchableHighlight
      underlayColor={'#EEAC87'}
      onPress={() => {
        sendDetails(item);
      }}
      style={{borderRadius: 20}}>
      <>
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 20,
          }}>
          <View style={{height: 10}} />
          {item.images?.length > 0 ? (
            <FlatList
              style={styles.flatlistBorder}
              horizontal
              data={item.images}
              renderItem={({item}) => {
                return <ImageItem url={item.url} />;
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : null}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={{flex: 1}} />
            <Text style={styles.disciplineText}>
              {parseDisciplinesString(item.disciplines)}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              flexDirection: 'row',
            }}>
            <View style={styles.imageContainer}>
              {item.createdBy[0].profilePic ? (
                <Image
                  style={styles.image}
                  source={{uri: item.createdBy[0].profilePic.url}}
                />
              ) : (
                <View style={styles.image}>
                  <UserDefault name={item.createdBy[0].name} />
                </View>
              )}
            </View>
            <Text style={styles.userText}>
              {item.createdBy[0].name + ' ' + item.createdBy[0].lastName}
            </Text>
            <View style={{flex: 1}} />
            <Icon name="man" size={34} color="black" />
            {/* TODO: este 0/20 me hace mal al cerebro, sera mejor sacarlo? */}

            <Text style={styles.quotaText}>
              {item.maxQuota === -1
                ? item.enrolled
                : item.enrolled + '/' + item.maxQuota}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <View style={{flex: 4}}>
              <Text style={styles.priceText}>{parsePriceText(item.price)}</Text>
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
                {removeArgentina(item.address)}
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
        {item.deleted ? (
          <View style={styles.deletedActivity}>
            <Text style={styles.deletedText}>Eliminada</Text>
          </View>
        ) : null}
      </>
    </TouchableHighlight>
  );
};

interface ImageProps {
  url: string;
}

const ImageItem = ({url}: ImageProps) => {
  const {width} = useWindowDimensions();
  const imageSize = (width - 40) / 3;
  return (
    <View style={{height: imageSize, width: imageSize}}>
      <Image
        style={{height: imageSize, width: imageSize}}
        source={{uri: url}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  addressText: {fontSize: 12, flexWrap: 'wrap'},
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
  deletedText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    transform: [{rotate: '-30deg'}],
  },
});

export default ActivityCard;
