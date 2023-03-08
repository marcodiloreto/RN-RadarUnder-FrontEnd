import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DatePicker from '../../components/createActivityForm/DatePicker';
import TimePicker from '../../components/createActivityForm/TimePicker';
import LineAndTitle from '../../components/LineAndTitle';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {dateAddTime, removeTimeData} from '../../helpers/dateParser';
import {ActivityControlData} from '../../interfaces/ActivityInterfaces';

// Activity tiene startDate con un horario posta, endDate es el mismo día,
// con el horario de fin
//TODO: una actividad puede terminar dias despues de empezar

const UniqueDateActivityScreen = () => {
  const {activity, setActivityField, setMultipleActivityField} = useContext(
    CreatedActivitiesContext,
  );

  const setTimeToDate = (time: Date, field: keyof ActivityControlData) => {
    var date: Date;
    if (activity?.startDate) {
      date = activity.startDate;
    } else {
      date = new Date();
    }
    const fullDate = dateAddTime(date, time);
    setActivityField(fullDate, field);
  };

  const setDate = (date: Date) => {
    setMultipleActivityField(date, ['startDate', 'endDate']);
  };

  return (
    <>
      <LineAndTitle direction="left" lable="El Día :" />
      <View style={styles.container}>
        <DatePicker
          value={activity?.startDate}
          setInForm={(value: Date) => {
            setDate(value);
          }}
        />
      </View>
      <LineAndTitle direction="right" lable="A las" />
      <View style={styles.container}>
        <TimePicker
          value={activity?.startDate}
          setInForm={(value: Date) => {
            setTimeToDate(value, 'startDate');
          }}
        />
      </View>
      <LineAndTitle direction="left" lable="Hasta las" />
      <View style={styles.container}>
        <TimePicker
          value={activity?.endDate}
          setInForm={(value: Date) => {
            setTimeToDate(value, 'endDate');
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default UniqueDateActivityScreen;
