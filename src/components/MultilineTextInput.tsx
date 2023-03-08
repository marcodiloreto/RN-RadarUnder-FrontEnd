import React, {useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ActivityForm} from '../theme/FormTheme';
import {Keyboard} from 'react-native';

interface Props {
  maxLength: number;
  onChangeText: (text: string) => void;
  placeholder: string;
  containerStyle?: ViewStyle;
  textInputStyle?: TextStyle;
  value?: string;
}

const MultilineTextInput = ({
  maxLength,
  onChangeText,
  value,
  containerStyle,
  textInputStyle,
  placeholder,
}: Props) => {
  const [length, setLength] = useState(0);
  const input = useRef({} as TextInput);

  //TODO: pressable onPress no abre teclado si el input ya está focused
  return (
    <>
      <Pressable
        style={{...styles.descInputContainer, ...containerStyle}}
        onPress={() => input.current.focus()}>
        <TextInput
          ref={input}
          multiline
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={'rgba(0,0,0,0.4)'}
          style={{
            ...ActivityForm.inputText,
            paddingHorizontal: 20,
            flex: 0,
          }}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={text => {
            onChangeText(text);
            setLength(text.length);
          }}
          blurOnSubmit={true}
          value={value}
        />
        <Text style={{position: 'absolute', bottom: 3, right: 20}}>
          {length}/{maxLength}
        </Text>
      </Pressable>
    </>
  );
};

export default MultilineTextInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },

  descInputContainer: {
    height: 200,
    borderRadius: 18,
    paddingBottom: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#d4f5d4',
    backgroundColor: 'white',
    marginTop: 8,
  },
});
