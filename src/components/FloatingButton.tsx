import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
  bottom?: number;
}

const FloatingButton = ({onPress, title, bottom = 0}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        position: 'absolute',
        bottom: 20 + bottom,
        right: 20,
        backgroundColor: '#E77536',
        height: 75,
        width: 75,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'black'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;
