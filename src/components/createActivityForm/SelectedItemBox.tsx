import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

//TODO: esto se puede emprolijar con genericos, (uso lo mismo en el PlanPicker)
interface Props<T> {
  item: T;
  erase: () => void;
  style?: ViewStyle;
}

interface Stringable extends Object {
  toString: () => string;
}

const SelectedItemBox = <T extends Stringable>({
  item,
  erase,
  style,
}: Props<T>) => {
  return (
    <TouchableOpacity
      style={{...styles.box, ...(style ? style : null)}}
      onPress={() => {
        erase();
      }}>
      <Text style={styles.text}>{item.toString()}</Text>
      <Icon name="close" color={'#7B7B7B'} size={20} />
    </TouchableOpacity>
  );
};

export default SelectedItemBox;

const styles = StyleSheet.create({
  box: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderColor: '#adadad',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 3,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    color: '#7B7B7B',
    marginHorizontal: 4,
    paddingBottom: 4,
  },
});
