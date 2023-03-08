import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  name?: string;
}
const UserDefault = ({name}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#32a852',
      }}>
      <Text style={{fontSize: 18, color: 'black'}}>{name ? name[0] : 'U'}</Text>
    </View>
  );
};

export default UserDefault;
