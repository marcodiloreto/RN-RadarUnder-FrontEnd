import React from 'react';
import {View} from 'react-native';

interface Props {
  height: number;
}

export const CenteredLine = ({height}: Props) => {
  return (
    <View
      style={{
        width: 2,
        backgroundColor: 'rgba(48, 19, 8, 0.4)',
        height: height,
      }}
    />
  );
};
