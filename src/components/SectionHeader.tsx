import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  button?: boolean;
  goBack?: () => void;
}

const SectionHeader = ({title, button, goBack}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#E77536',
        elevation: 8,
      }}>
      {button && (
        <TouchableOpacity
          style={{marginLeft: 10}}
          activeOpacity={0.7}
          onPress={goBack}>
          <Icon name="arrow-back" color={'#231108'} size={30} />
        </TouchableOpacity>
      )}
      <View style={{flex: 1}} />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#452210',
          paddingBottom: 3,
          marginRight: 60,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;
