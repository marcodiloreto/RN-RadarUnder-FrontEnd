import React, {useRef, useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, useWindowDimensions, View, Alert} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CreatedActivityAddress from './CreateActivityCarouselScreens/CreatedActivityAddress';
import CreatedActivityDate from './CreateActivityCarouselScreens/CreatedActivityDate';
import CreatedActivityGeneralInfo from './CreateActivityCarouselScreens/CreatedActivityGeneralInfo';
import {
  ActivityListItemData,
  ActivityControlData,
} from '../interfaces/ActivityInterfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParams} from '../navigators/AppStackNavigator';
import {useForm} from '../hooks/useForm';
import {CreatedActivitiesContext} from '../context/CreatedActivitiesContext';
import SectionHeader from '../components/SectionHeader';
import * as Progress from 'react-native-progress';
import BeforeAfterButton from '../components/BeforeAfterButton';
import FloatingButton from '../components/FloatingButton';

interface Props
  extends StackScreenProps<AppStackParams, 'CreateActivityCarouselScreen'> {}

const CreateActivityCarouselScreen = ({navigation}: Props) => {
  const {activity, addActivity, updateActivity} = useContext(
    CreatedActivitiesContext,
  );
  const {width} = useWindowDimensions();
  const carousel = useRef({} as Carousel<JSX.Element>);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselScreens = [
    <CreatedActivityGeneralInfo />, //TODO: que se cargue con la data de activity
    <CreatedActivityDate />,
    <CreatedActivityAddress />,
  ];
  const carouselNames = [
    'Información general',
    'Fechas y horarios',
    'Espacio y dirección',
  ];

  const create = async () => {
    const resp = await addActivity();
    if (typeof resp === 'number') {
      if (resp === 201) {
        Alert.alert('Actividad creada', resp.toString(), [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Algo salió mal en el servidor \n' + resp, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
    } else {
      Alert.alert('Formulario Invalido', resp, [
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }
  };

  const update = async () => {
    const resp = await updateActivity(activity!.id!);
    if (typeof resp === 'number') {
      if (resp === 200) {
        Alert.alert('Actividad modificada', resp.toString(), [
          {
            text: 'OK',
            onPress: () => {
              // @ts-ignore
              navigation.navigate('BottomTabsNavigator', {
                screen: 'ActivityTopTabsNavigator',
                params: {
                  screen: 'CreatedActivitiesScreen',
                },
              });
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Algo salió mal en el servidor \n' + resp, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
    } else {
      Alert.alert('Formulario Invalido', resp, [
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }
  };

  const prev = () => {
    carousel.current.snapToPrev(true);
  };

  const next = () => {
    carousel.current.snapToNext(true);
  };

  return (
    <>
      <SectionHeader
        title={activity?.id ? 'Tu actividad' : 'Crear Actividad'}
        button
        goBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <BeforeAfterButton
            direction="prev"
            color="#301308"
            size={25}
            onPress={prev}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <Progress.Bar
              progress={(activeSlide + 1) / carouselScreens.length}
              width={null}
              animated
              color="#301308"
            />
          </View>
          <BeforeAfterButton
            direction="next"
            color="#301308"
            size={25}
            onPress={next}
          />
        </View>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={{fontSize: 15}}>{carouselNames[activeSlide]}</Text>
        </View>

        <Carousel
          scrollEnabled={true}
          ref={carousel}
          data={carouselScreens}
          renderItem={({item, index}) => {
            return item;
          }}
          onSnapToItem={index => setActiveSlide(index)}
          sliderWidth={width - 40}
          itemWidth={width - 40}
        />
      </View>
      {activity?.id ? (
        <FloatingButton onPress={update} title="guardar cambios" />
      ) : (
        <FloatingButton onPress={create} title="crear" />
      )}
    </>
  );
};

export default CreateActivityCarouselScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E9C8B6',
  },
});
