import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, View, ViewProps} from 'react-native';

interface Props {
  url: string;
  containerScale: {height: number};
}

export const ScaledImage = ({containerScale, url}: Props) => {
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState({width: 0, height: 0});

  useEffect(() => {
    Image.getSize(
      url,
      (width, height) => {
        var resizeRatio = containerScale.height / height;
        height = height * resizeRatio;
        width = width * resizeRatio;
        setScale({width, height});
        setLoading(false);
      },
      e => {
        console.log('scaledImageError:' + e);
        setScale({height: containerScale.height, width: containerScale.height});
        setLoading(false);
      },
    );
  }, []);

  return (
    <View
      style={{
        ...containerScale,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {loading && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size={46} color={'black'} />
        </View>
      )}
      {!loading && (
        <Image source={{uri: url}} style={{...scale, borderRadius: 20}} />
      )}
    </View>
  );
};
