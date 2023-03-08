import React from 'react';
import {Image, View} from 'react-native';

const WhiteLogo = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 20,
      }}>
      <Image
        source={require('../../assets/react-logo-white.png')}
        style={{
          width: 110,
          height: 100,
        }}
      />
    </View>
  );
};

export default WhiteLogo;
