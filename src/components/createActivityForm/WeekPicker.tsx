import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Plan, Week} from '../../interfaces/ActivityInterfaces';
import * as lodash from 'lodash';
import {weekDaysSort} from '../../helpers/ArrayStateManager';

interface Props {
  open: boolean;
  plan: Plan;
  setPlan: (plan: Plan) => void;
}

const WeekPicker = ({open, plan, setPlan}: Props) => {
  if (!open) return null;

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: 10,
        top: -10,
        paddingBottom: 2,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      }}>
      <FlatList
        data={Object.values(Week)}
        renderItem={({item}) => (
          <RenderItem item={item} plan={plan} setPlan={setPlan} />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderTopWidth: 1,
              borderColor: 'lightgrey',
              marginHorizontal: 3,
            }}
          />
        )}
      />
    </View>
  );
};

interface ItemProps {
  item: Week;
  plan: Plan;
  setPlan: (plan: Plan) => void;
}

const RenderItem = ({item, plan, setPlan}: ItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setPlan({
          ...plan,
          days: weekDaysSort(lodash.uniq([...plan.days, item])),
        });
      }}>
      <Text style={{fontSize: 16, marginLeft: 20, marginVertical: 5}}>
        {item.toString()}
      </Text>
    </TouchableOpacity>
  );
};

export default WeekPicker;
