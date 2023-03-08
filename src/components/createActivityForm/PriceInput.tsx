import CheckBox from '@react-native-community/checkbox';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Keyboard, Text, TextInput, View} from 'react-native';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {ActivityForm} from '../../theme/FormTheme';

// interface Props {
//   price?: number;
//   setPrice: () => void;
// }

export const PriceInput = () => {
  const {activity, setActivityField} = useContext(CreatedActivitiesContext);
  const [checked, setChecked] = useState(activity?.price === -1 ? true : false);
  const priceRef = useRef({} as TextInput);

  useEffect(() => {
    console.log(activity?.price);
    if (checked) {
      setActivityField(-1, 'price');
      priceRef.current.setNativeProps({
        editable: false,
        placeholder: 'a la gorra!',
        text: 'A la gorra',
      });
    } else {
      priceRef.current.setNativeProps({
        editable: true,
        placeholder: 'Puede ser 0 (gratis)',
        text: '',
      });
    }
  }, [checked]);

  useEffect(() => {
    if (activity?.price === -1) {
      priceRef.current.setNativeProps({
        editable: false,
        placeholder: 'a la gorra!',
        text: 'A la gorra',
      });
    }
  }, [activity?.price]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          marginTop: 25,
        }}>
        <Text style={{...ActivityForm.label, marginTop: 0, paddingTop: 5}}>
          Precio:
        </Text>
        <View style={{flex: 1}} />

        <Text style={{paddingTop: 7}}>a la gorra</Text>
        <CheckBox
          value={checked}
          onValueChange={newValue => setChecked(newValue)}
          tintColors={{true: '#c96026'}}
        />
      </View>
      <View style={ActivityForm.inputContainer}>
        <TextInput
          ref={priceRef}
          keyboardType="numeric"
          placeholder="Puede ser gratis"
          placeholderTextColor={'rgba(0,0,0,0.4)'}
          style={ActivityForm.inputText}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={value => setActivityField(value, 'price')}
          value={activity?.price ? activity.price.toString() : undefined}
          blurOnSubmit={false}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
    </>
  );
};
