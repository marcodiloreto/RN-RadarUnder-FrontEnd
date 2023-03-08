import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Week} from '../interfaces/ActivityInterfaces';

interface Props {
  selected?: boolean;
  disabled?: boolean;
  day: Week;
  add: (day: Week) => void;
  erase: (day: Week) => void;
}

const ToggleDayButton = ({selected, disabled, day, add, erase}: Props) => {
  const [toggled, setToggled] = useState(selected || false);
  const button = useRef({} as TouchableOpacity);
  const toggle = () => {
    setToggled(!toggled);
    if (!toggled) {
      add(day);
    } else {
      erase(day);
    }
  };

  useEffect(() => {
    if (toggled) {
      button.current.setNativeProps({
        style: {
          backgroundColor: '#EEAC87',
          elevation: 5,
        },
      });
    } else {
      button.current.setNativeProps({
        style: {
          backgroundColor: '#f5f5f5',
          elevation: 10,
        },
      });
    }
  }, [toggled]);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      style={styles.container}
      ref={button}
      onPress={toggle}>
      <Text style={styles.text}>{day.toString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    marginHorizontal: 5,
  },
});

export default ToggleDayButton;
