import MultiSlider, {LabelProps} from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Text, View} from 'react-native';

interface Props {
  first: {
    value: number | undefined;
    min: number;
    minLabel?: string;
  };
  second: {
    value: number | undefined;
    max: number;
    maxLabel?: string;
  };
  setChanges: (values: number[]) => void;
  step?: number;
}

const CustomMultiSlider = ({first, second, setChanges, step}: Props) => {
  const {width} = useWindowDimensions();

  const renderFirst = () => {
    const {value, min, minLabel} = first;
    if (value) {
      if (value === min && minLabel) {
        return minLabel;
      }
      return value.toString();
    } else if (minLabel) {
      return minLabel;
    } else {
      return min.toString();
    }
  };

  const renderSecond = () => {
    const {value, max, maxLabel} = second;
    if (value) {
      if (value === max && maxLabel) {
        return maxLabel;
      }
      return value.toString();
    } else if (maxLabel) {
      return maxLabel;
    } else {
      return max.toString();
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
          }}>
          {renderFirst()}
        </Text>
      </View>
      <MultiSlider
        step={step}
        snapped
        values={[first.value || first.min, second.value || second.max]}
        customLabel={props => <Label props={props} />}
        min={first.min}
        max={second.max}
        sliderLength={width - 180}
        trackStyle={{
          height: 7,
          borderRadius: 100,
        }}
        markerStyle={{
          height: 18,
          width: 18,
          borderRadius: 18,
          top: 4,
        }}
        pressedMarkerStyle={{
          height: 26,
          width: 26,
          borderRadius: 26,
        }}
        enableLabel
        onValuesChangeFinish={values => setChanges(values)}
      />
      <View
        style={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
          }}>
          {renderSecond()}
        </Text>
      </View>
    </View>
  );
};

interface sliderProps {
  props: LabelProps;
}

const Label = ({props}: sliderProps) => {
  var position: number;
  var value: string | number;

  if (props.oneMarkerPressed) {
    position = props.oneMarkerLeftPosition;
    value = props.oneMarkerValue;
  } else if (props.twoMarkerPressed) {
    position = props.twoMarkerLeftPosition;
    value = props.twoMarkerValue;
  } else {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: -35,
        left: position - 20,
        padding: 3,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(245,245,245,1)',
      }}>
      <Text style={{fontSize: 16}}>{value}</Text>
    </View>
  );
};

export default CustomMultiSlider;
