import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import DatePickerModal from 'react-native-date-picker';
import {parseDateString, removeTimeData} from '../../helpers/dateParser';
import {ActivityForm} from '../../theme/FormTheme';

interface Props {
  value: Date | undefined;
  setInForm: (date: Date) => void;
}

const DatePicker = ({value, setInForm}: Props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);
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
          marginTop: 5,
          ...ActivityForm.inputContainer,
          width: 135,
          paddingHorizontal: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', flex: 1, alignContent: 'center'}}
          onPress={initComponent}>
          <TextInput
            ref={input}
            style={{
              ...ActivityForm.inputText,
              marginTop: 2,
            }}
            editable={false}
            value={date ? parseDateString(new Date(date)) : undefined}
          />
        </TouchableOpacity>
      </View>

      <DatePickerModal
        title={'Seleccione fecha'}
        modal
        mode="date"
        locale="es"
        open={open}
        date={date ? new Date(date) : new Date()}
        onConfirm={date => {
          setDate(removeTimeData(date));
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 135,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default DatePicker;
