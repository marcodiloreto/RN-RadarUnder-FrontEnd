import React from 'react';
import {View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  direction: 'prev' | 'next';
  onPress: () => void;
  size: number;
  color: string;
}

const BeforeAfterButton = ({direction, size, onPress, color}: Props) => {
  const name =
    direction === 'next' ? 'chevron-forward-outline' : 'chevron-back-outline';

  return (
    <Pressable
      onPress={onPress}
      style={{
        alignSelf: direction === 'next' ? 'flex-end' : 'flex-start',
      }}>
      <Icon size={size} name={name} color={color} />
    </Pressable>
  );
};

export default BeforeAfterButton;
