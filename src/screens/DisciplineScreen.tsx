import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {ScaledImage} from '../components/ScaledImage';
import SectionHeader from '../components/SectionHeader';
import useDisciplineGetter from '../hooks/useDisciplineGetter';
import {AppStackParams} from '../navigators/AppStackNavigator';
import LoadingScreen from './LoadingScreen';

interface Props extends StackScreenProps<AppStackParams, 'DisciplineScreen'> {}
const DisciplineScreen = ({navigation, route}: Props) => {
  const {discipline, loading} = useDisciplineGetter(route.params.id);

  if (loading) {
    return (
      <>
        <SectionHeader
          title="Actividad"
          button
          goBack={() => {
            navigation.goBack();
          }}
        />
        <LoadingScreen />
      </>
    );
  }

  if (!discipline) {
    return (
      <SectionHeader
        title="Actividad"
        button
        goBack={() => {
          navigation.goBack();
        }}
      />
    );
  }

  return (
    <>
      <SectionHeader
        title="Actividad"
        button
        goBack={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.cardHead}>
        <Text style={styles.title}>{discipline.name}</Text>

        <View style={styles.flatlistContainer}>
          <FlatList
            style={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={discipline.images}
            renderItem={({item}) => {
              return <ImageItem url={item.url} />;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
          />
        </View>
      </View>
      <View style={{margin: 20}}>
        <Text style={styles.descText}>{discipline.description}</Text>
      </View>
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

  descText: {
    fontSize: 18,
    color: 'black',
  },
});

export default DisciplineScreen;
