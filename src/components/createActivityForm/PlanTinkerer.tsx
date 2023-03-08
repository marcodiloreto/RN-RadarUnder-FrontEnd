import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Plan} from '../../interfaces/ActivityInterfaces';
import PlanTimePicker from './PlanTimePicker';
import SelectedItemBox from './SelectedItemBox';
import WeekPicker from './WeekPicker';
import {arrayDeleteOne} from '../../helpers/ArrayStateManager';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface PlanTinkererProps {
  plan: Plan;
  sendPlan: (plan: Plan) => void;
}

const PlanTinkerer = ({plan, sendPlan}: PlanTinkererProps) => {
  const [open, setOpen] = useState(false);
  const [pickerHeight, setPickerHeight] = useState(40);
  const erase = (index: number) => {
    sendPlan({...plan, days: arrayDeleteOne(plan.days, index)});
  };

  const selectedDays = () => {
    return plan.days.map((day, index) => {
      return (
        <SelectedItemBox
          key={index}
          item={day}
          erase={() => erase(index)}
          style={{
            marginLeft: 5,
            marginTop: 5,
          }}
        />
      );
    });
  };

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Text style={{marginRight: 10}}>De las</Text>
          <PlanTimePicker
            value={plan ? plan.startTime : undefined}
            setInForm={(value: Date) => {
              sendPlan({...plan, startTime: value});
            }}
          />
          <View style={{flex: 0.3}} />
          <Text style={{marginRight: 10}}>Hasta las</Text>
          <PlanTimePicker
            value={plan ? plan.endTime : undefined}
            setInForm={(value: Date) => {
              sendPlan({...plan, endTime: value});
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setOpen(!open)}
          style={styles.weekPick}
          onLayout={({nativeEvent}) => {
            setPickerHeight(nativeEvent.layout.height);
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginRight: 30,
            }}>
            {plan.days ? selectedDays() : null}
          </View>
          <View style={{position: 'absolute', width: 30, right: 0}}>
            {open ? (
              <Icon
                style={{marginHorizontal: 5}}
                name="chevron-up-outline"
                color={'rgba(0,0,0,0.6)'}
                size={20}
              />
            ) : (
              <Icon
                style={{marginHorizontal: 5}}
                name="chevron-down-outline"
                color={'rgba(0,0,0,0.6)'}
                size={20}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 15,
          left: 30,
          right: 30,
          top: 135 + pickerHeight,
        }}>
        <WeekPicker open={open} plan={plan} setPlan={sendPlan} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  weekPick: {
    marginHorizontal: 30,
    marginBottom: 30,
    marginTop: 20,
    borderRadius: 2,
    backgroundColor: '#f5f5f5',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
  },
});

export default PlanTinkerer;
