import React from 'react';
import {View} from 'react-native';

const LoginBackground = () => {
  return (
    <View
      style={{
        position: 'absolute',
        height: 1200,
        width: 1000,
        top: -290,
        transform: [{rotate: '-75deg'}],
        backgroundColor: '#E77536',
        // elevation: 5,
      }}></View>
  );
};

export default LoginBackground;
