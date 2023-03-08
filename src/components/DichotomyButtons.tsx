import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  value: boolean | undefined;
  title1: string;
  title2: string;
  onPress1: () => void;
  onPress2: () => void;
}

export const DichotomyButtons = ({
  onPress1,
  onPress2,
  title1,
  title2,
  value,
}: Props) => {
  const button1 = useRef({} as TouchableOpacity);
  const button2 = useRef({} as TouchableOpacity);

  useEffect(() => {
    if (typeof value === 'undefined') {
      return;
    } else if (value === true) {
      button1.current.setNativeProps({
        style: {
          backgroundColor: '#f5f5f5',
          elevation: 10,
        },
      });
      button2.current.setNativeProps({
        style: {
          backgroundColor: 'rgba(238, 172, 135,1)',
          elevation: 5,
        },
      });
    } else if (value === false) {
      button1.current.setNativeProps({
        style: {
          backgroundColor: 'rgba(238, 172, 135,1)',
          elevation: 5,
        },
      });
      button2.current.setNativeProps({
        style: {
          backgroundColor: '#f5f5f5',
          elevation: 10,
        },
      });
    }
  }, [value]);

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity
        activeOpacity={0.8}
        ref={button1}
        style={styles.button}
        onPress={onPress1}>
        <Text style={styles.buttonText}>{title1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        ref={button2}
        style={styles.button}
        onPress={onPress2}>
        <Text style={styles.buttonText}>{title2}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    elevation: 10,
  },
  buttonText: {
    color: 'black',
    marginHorizontal: 5,
    fontSize: 15,
  },
});
