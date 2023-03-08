import {useRef} from 'react';
import {Animated, Easing} from 'react-native';

const useAnimation = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;

  const fadeIn = (duration: number = 300) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = (duration: number = 300) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const offsetAnimation = (
    initOffSet: number = -100,
    duration: number = 700,
  ) => {
    position.setValue(initOffSet);
    Animated.timing(position, {
      toValue: 0,
      duration,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  return {opacity, position, offsetAnimation, fadeIn, fadeOut};
};

export default useAnimation;
