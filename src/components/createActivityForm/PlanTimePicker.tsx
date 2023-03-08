import React, {useEffect, useRef, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {noMins, parseTimeString} from '../../helpers/dateParser';
import {ActivityForm} from '../../theme/FormTheme';
import DatePickerModal from 'react-native-date-picker';

interface Props {
  value: Date | undefined;
  setInForm: (date: Date) => void;
}

const PlanTimePicker = ({value, setInForm}: Props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value);
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
          width: 63,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={initComponent}>
          <TextInput
            style={{
              ...ActivityForm.inputText,
              marginTop: 2,
            }}
            underlineColorAndroid={'black'}
            editable={false}
            value={value ? parseTimeString(new Date(value)) : ''}
          />
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
        date={date ? new Date(date) : noMins()}
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

export default PlanTimePicker;
