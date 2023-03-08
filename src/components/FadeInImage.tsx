import React, {useState, useEffect} from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  ImageStyle,
  StyleProp,
} from 'react-native';
import useAnimation from '../hooks/useAnimation';
interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style}: Props) => {
  const {opacity, fadeIn} = useAnimation();
  const [loading, setLoading] = useState(true);
  /*useEffect(() => {
    fadeIn();
  }, []); Tiene una propiedad OnLoadEnd */

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {loading && (
        <ActivityIndicator size={25} style={{position: 'absolute'}} />
      )}

      <Animated.Image
        onLoadEnd={() => {
          setLoading(false);
          fadeIn(1000);
        }}
        source={{uri}}
        //style={style} si no tuviera que poner el opacity esto funciona
        style={{...(style as any), opacity}}
      />
    </View>
  );
};
