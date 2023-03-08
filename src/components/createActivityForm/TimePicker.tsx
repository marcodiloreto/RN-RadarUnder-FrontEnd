import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePickerModal from 'react-native-date-picker';
import {midDay, parseTimeString} from '../../helpers/dateParser';
import {ActivityForm} from '../../theme/FormTheme';

interface Props {
  value: Date | undefined;
  setInForm: (date: Date) => void;
}
//HACER ESTO ESCALABLE MI DIOS YA TENGO 2 COMPONENTES
//TODO: funciona como el orto
const TimePicker = ({value, setInForm}: Props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value);
  const input = useRef({} as TextInput);
  const initComponent = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (date) {
      setInForm(date);
    }
  }, [date]);

  return (
    <>
      <View
        style={{
          width: 120,
          marginTop: 5,
          ...ActivityForm.inputContainer,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={initComponent}>
          <TextInput
            ref={input}
            style={{
              ...ActivityForm.inputText,
              marginTop: 2,
            }}
            editable={false}
            value={value ? parseTimeString(new Date(value)) : undefined}
          />
          <Text
            style={{
              alignSelf: 'flex-end',
              marginBottom: 13,
              marginRight: 15,
            }}>
            Hs
          </Text>
        </TouchableOpacity>
      </View>

      <DatePickerModal
        title={'Seleccione horario'}
        minuteInterval={5}
        modal
        mode="time"
        is24hourSource="locale"
        locale="es"
        open={open}
        date={date ? new Date(date) : midDay()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default TimePicker;
