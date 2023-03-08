import CheckBox from '@react-native-community/checkbox';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Keyboard, Text, TextInput, View} from 'react-native';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {ActivityForm} from '../../theme/FormTheme';

export const QuotaInput = () => {
  const {activity, setActivityField} = useContext(CreatedActivitiesContext);
  const [checked, setChecked] = useState(
    activity?.maxQuota === -1 ? true : false,
  );
  const ref = useRef({} as TextInput);

  useEffect(() => {
    if (checked) {
      setActivityField(-1, 'maxQuota'); //TODO: que no se muestre el -1
      ref.current.setNativeProps({
        editable: false,
        placeholder: 'Sin limite',
        text: 'Sin limite',
      });
    } else {
      ref.current.setNativeProps({
        editable: true,
        placeholder: 'Cupo maximo de inscriptos',
        text: '',
      });
    }
  }, [checked]);

  useEffect(() => {
    if (activity?.maxQuota === -1) {
      ref.current.setNativeProps({
        editable: false,
        placeholder: 'Sin limite',
        text: 'Sin limite',
      });
    }
  }, [activity?.maxQuota]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          marginTop: 25,
        }}>
        <Text style={{...ActivityForm.label, marginTop: 0, paddingTop: 5}}>
          Cupos:
        </Text>
        <View style={{flex: 1}} />

        <Text style={{paddingTop: 7}}>Sin Limite</Text>
        <CheckBox
          value={checked}
          onValueChange={newValue => setChecked(newValue)}
          tintColors={{true: '#c96026'}}
        />
      </View>
      <View style={ActivityForm.inputContainer}>
        <TextInput
          ref={ref}
          keyboardType="numeric"
          placeholder="Puede ser gratis"
          placeholderTextColor={'rgba(0,0,0,0.4)'}
          style={ActivityForm.inputText}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={value => setActivityField(value, 'maxQuota')}
          value={activity?.maxQuota?.toString()}
          blurOnSubmit={false}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
    </>
  );
};
