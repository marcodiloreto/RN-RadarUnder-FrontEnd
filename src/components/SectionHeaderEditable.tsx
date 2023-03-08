import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  goBack: () => void;
  edit: () => void;
  erase: () => void;
}

export const SectionHeaderEditable = ({title, goBack, edit, erase}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#E77536',
        elevation: 8,
      }}>
      <TouchableOpacity
        style={{marginLeft: 10}}
        activeOpacity={0.7}
        onPress={goBack}>
        <Icon name="arrow-back" color={'#231108'} size={30} />
      </TouchableOpacity>

      <View style={{flex: 1}} />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#452210',
          paddingBottom: 3,
        }}>
        {title}
      </Text>
      <TouchableOpacity
        style={{marginLeft: 40}}
        activeOpacity={0.7}
        onPress={edit}>
        <Icon name="create-outline" color={'#231108'} size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginLeft: 20, marginRight: 20}}
        activeOpacity={0.7}
        onPress={erase}>
        <Icon name="trash-outline" color={'#231108'} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeaderEditable;
