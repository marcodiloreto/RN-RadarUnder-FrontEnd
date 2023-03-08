import React, {useContext, useEffect, useState} from 'react';
import {Platform, Switch, Text, View} from 'react-native';
import {PlanDateActivityScreen} from './PlanDateActivityScreen';
import UniqueDateActivityScreen from './UniqueDateActivityScreen';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';

const CreatedActivityDate = () => {
  const {activity, setActivityField} = useContext(CreatedActivitiesContext);
  const [isOn, setIsOn] = useState(false);
  const [title, setTitle] = useState<
    'Actividad puntual' | 'Actividad rutinaria'
  >('Actividad puntual');

  useEffect(() => {
    if (activity?.repeatable) {
      setIsOn(true);
    }
  }, []);

  useEffect(() => {
    if (isOn) {
      setActivityField(isOn, 'repeatable');
    } else {
      setActivityField(isOn, 'repeatable');
    }
  }, [isOn]);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    setActivityField(!isOn, 'repeatable');
    if (!isOn) {
      setTitle('Actividad rutinaria');
    } else {
      setTitle('Actividad puntual');
    }
  };

  return (
    <>
      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
          {title}
        </Text>
        <View style={{flex: 1}} />

        <Switch //TODO:HORRIBLE!!!!!!!!
          trackColor={{false: 'white', true: 'orange'}}
          thumbColor={
            Platform.OS === 'android' ? (isOn ? 'orange' : 'white') : ''
          }
          onValueChange={toggleSwitch}
          value={isOn}
        />
      </View>
      {isOn ? <PlanDateActivityScreen /> : <UniqueDateActivityScreen />}
    </>
  );
};

export default CreatedActivityDate;
