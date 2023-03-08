import React, {useContext} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import DatePicker from '../../components/createActivityForm/DatePicker';
import PlanPicker from '../../components/createActivityForm/PlanPicker';
import LineAndTitle from '../../components/LineAndTitle';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {removeTimeData} from '../../helpers/dateParser';
import {ScrollView} from 'react-native-gesture-handler';
import {Plan, Week} from '../../interfaces/ActivityInterfaces';

export const PlanDateActivityScreen = () => {
  const {activity, setActivityField} = useContext(CreatedActivitiesContext);

  const setStartDate = (date: Date) => {
    setActivityField(removeTimeData(date), 'startDate');
  };

  //TODO: plazo para el plan de ejecución no puede ser más de 6 meses
  //esto no funciona
  const setEndDate = (date: Date) => {
    if (
      activity?.startDate &&
      date.isAfter(new Date(activity.startDate).addMonths(6))
    ) {
      Alert.alert(
        'Error:',
        'La fecha de finalización no puede tener más de 6 meses de diferencia con la inicial',
      );
    } else {
      setActivityField(removeTimeData(date), 'endDate');
    }
  };

  return (
    <ScrollView>
      <LineAndTitle height={60} direction="left" lable="Desde el:" />
      <View style={styles.pickerContainer}>
        <DatePicker
          value={activity?.startDate}
          setInForm={(value: Date) => {
            setStartDate(value);
          }}
        />
      </View>
      <LineAndTitle height={60} direction="left" lable="Planes :" />
      <View style={{zIndex: 10}}>
        <PlanPicker
          plans={
            activity?.plan
              ? activity.plan
              : [
                  {
                    days: [] as Week[],
                  } as Plan,
                ]
          }
          setActivityPlans={(plans: Plan[]) => setActivityField(plans, 'plan')}
        />
      </View>
      <View style={{zIndex: 9}}>
        <LineAndTitle height={60} direction="right" lable="Hasta el:" />
        <View style={styles.pickerContainer}>
          <DatePicker
            value={activity?.endDate}
            setInForm={(value: Date) => {
              setEndDate(value);
            }}
          />
        </View>
      </View>
      <View style={{marginBottom: 300}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
