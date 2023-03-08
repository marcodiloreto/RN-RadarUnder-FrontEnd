import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SectionHeader from '../components/SectionHeader';
import {useUserModificationHandler} from '../hooks/UserModificationHandler';
import {AppStackParams} from '../navigators/AppStackNavigator';
import {ActivityForm} from '../theme/FormTheme';
import LoadingScreen from './LoadingScreen';

interface Props
  extends StackScreenProps<AppStackParams, 'ModifyUserDataScreen'> {}

const ModifyUserDataScreen = ({navigation, route}: Props) => {
  const {params} = route;
  const {
    loading,
    user,
    sendModification,
    modifications,
    setModification,
    passParams,
    setPassParams,
    changePassword,
  } = useUserModificationHandler(params.id);

  if (loading) {
    return (
      <>
        <SectionHeader
          title="Modificar informacion de usuario"
          button
          goBack={() => {
            navigation.goBack();
          }}
        />
        <LoadingScreen />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <SectionHeader
          title="Modificar informacion de usuario"
          button
          goBack={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: 'black'}}>
            Ocurrió un error al buscar los datos del usuario
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <SectionHeader
        title="Modificar informacion de usuario"
        button
        goBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <KeyboardAvoidingView behavior="height">
          <View style={{margin: 20}}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Nombre:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={user.name}
                  placeholderTextColor={'rgba(0,0,0,0.4)'}
                  style={ActivityForm.inputText}
                  autoCapitalize={'words'}
                  autoCorrect={false}
                  onChangeText={value => setModification(value, 'name')}
                  value={modifications?.name}
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Apellido:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={user.lastName}
                  placeholderTextColor={'rgba(0,0,0,0.4)'}
                  style={ActivityForm.inputText}
                  autoCapitalize={'words'}
                  autoCorrect={false}
                  onChangeText={value => setModification(value, 'lastName')}
                  value={modifications?.lastName}
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Teléfono:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={user.phone}
                  placeholderTextColor={'rgba(0,0,0,0.4)'}
                  style={ActivityForm.inputText}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  onChangeText={value => setModification(value, 'phone')}
                  value={modifications?.phone}
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.modifyButton}
              activeOpacity={0.8}
              onPress={sendModification}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={{margin: 20}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: 'black',
                alignSelf: 'center',
              }}>
              Cambio de contraseña
            </Text>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Contraseña:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={''}
                  placeholderTextColor={'rgba(0,0,0,0.4)'}
                  style={ActivityForm.inputText}
                  autoCapitalize={'words'}
                  autoCorrect={false}
                  onChangeText={value => setPassParams(value, 'password')}
                  value={modifications?.lastName}
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Nueva contraseña:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={''}
                  placeholderTextColor={'rgba(0,0,0,0.4)'}
                  style={ActivityForm.inputText}
                  autoCapitalize={'words'}
                  autoCorrect={false}
                  onChangeText={value => setPassParams(value, 'newPassword')}
                  value={modifications?.lastName}
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.changePassButton}
              activeOpacity={0.8}
              onPress={changePassword}>
              <Text style={styles.changePasssButtonText}>
                Cambiar contraseña
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    paddingHorizontal: 20,
  },
  fieldContainer: {marginHorizontal: 10, marginVertical: 5},
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    elevation: 2,
    backgroundColor: '#d4f5d4',
    width: '100%',
    marginVertical: 10,
  },
  modifyButton: {
    marginTop: 20,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#E77536',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  changePassButton: {
    marginTop: 30,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#002D62',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePasssButtonText: {
    fontSize: 19,
    color: 'white',
    fontWeight: '600',
  },
});
export default ModifyUserDataScreen;
