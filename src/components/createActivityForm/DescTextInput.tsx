import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {ActivityForm} from '../../theme/FormTheme';

const DescTextInput = () => {
  const {activity, setActivityField} = useContext(CreatedActivitiesContext);
  const [length, setLength] = useState(0);
  const maxLength = 500; //TODO: cuanto deberia ser este numero?
  const input = useRef({} as TextInput);

  const onChangeText = (value: string) => {
    setActivityField(value, 'description');
    setLength(value.length);
  };

  return (
    <>
      <Text style={ActivityForm.label}>Descripción:</Text>
      <Pressable
        style={styles.descInputContainer}
        onPress={() => input.current.focus()}>
        <TextInput
          ref={input}
          multiline
          maxLength={maxLength}
          placeholder="Describa la actividad"
          placeholderTextColor={'rgba(0,0,0,0.4)'}
          style={{...ActivityForm.inputText, flex: 0}}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={text => {
            onChangeText(text);
          }}
          blurOnSubmit={true}
          value={activity?.description}
        />
        <Text style={{position: 'absolute', bottom: 3, right: 10}}>
          {length}/{maxLength}
        </Text>
      </Pressable>
    </>
  );
};

export default DescTextInput;

const styles = StyleSheet.create({
  descInputContainer: {
    height: 200,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
