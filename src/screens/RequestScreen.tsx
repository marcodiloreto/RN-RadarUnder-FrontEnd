import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useDisciplineRequest from '../hooks/useDisciplineRequest';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParams} from '../navigators/AppStackNavigator';
import SectionHeader from '../components/SectionHeader';
import {ActivityForm} from '../theme/FormTheme';
import MultilineTextInput from '../components/MultilineTextInput';

interface Props extends StackScreenProps<AppStackParams, 'RequestScreen'> {}

const RequestScreen = ({navigation}: Props) => {
  const {request, sendRequest, setRequestField} =
    useDisciplineRequest(navigation);

  return (
    <>
      <SectionHeader
        title="Solicitud de categoría"
        button
        goBack={navigation.goBack}
      />
      <View style={{margin: 20, paddingTop: 60}}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nombre de la disciplina</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Nombre'}
              placeholderTextColor={'rgba(0,0,0,0.4)'}
              style={{...ActivityForm.inputText, paddingHorizontal: 20}}
              autoCorrect={false}
              onChangeText={value => setRequestField(value, 'disciplineName')}
              value={request.disciplineName}
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        </View>
        <View style={{height: 30}} />
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Descripción/aclaración sobre el pedido
          </Text>
          <MultilineTextInput
            placeholder="(opcional)"
            maxLength={150}
            onChangeText={value => setRequestField(value, 'description')}
            value={request.description}
          />
          <View style={{height: 100}} />
          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.8}
            onPress={sendRequest}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    borderRadius: 18,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#d4f5d4',
    backgroundColor: 'white',
    marginTop: 8,
  },
  fieldContainer: {marginHorizontal: 10, marginVertical: 5},
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  sendButton: {
    marginTop: 20,
    marginHorizontal: 50,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#E77536',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
});
export default RequestScreen;
