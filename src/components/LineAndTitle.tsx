import React from 'react';
import {Text, View} from 'react-native';
import {ActivityForm} from '../theme/FormTheme';
import {CenteredLine} from './Line';

interface Props {
  direction: 'left' | 'right';
  lable: string;
  height?: number;
}

const LineAndTitle = ({direction, lable, height = 100}: Props) => {
  if (direction === 'left') {
    return (
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <Text
            style={{
              marginBottom: 15,
              marginRight: 20,
              ...ActivityForm.label,
            }}>
            {lable}
          </Text>
        </View>
        <CenteredLine height={height} />
        <View style={{flex: 1}} />
      </View>
    );
  } else {
    return (
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{flex: 1}} />
        <CenteredLine height={height} />
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              marginBottom: 15,
              marginLeft: 20,
              ...ActivityForm.label,
            }}>
            {lable}
          </Text>
        </View>
      </View>
    );
  }
};

export default LineAndTitle;
