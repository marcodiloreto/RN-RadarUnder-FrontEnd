import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LoginBackground from '../components/LoginBackground';
import WhiteLogo from '../components/WhiteLogo';
import {userForm} from '../theme/FormTheme';
import {global} from '../theme/global';
import {Platform} from 'react-native';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/AuthStackNavigator';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

interface Register {
  email: string;
  password: string;
  password2: string;
  name: string;
  lastName?: string;
  phone?: string;
}

const RegisterScreen = ({navigation}: Props) => {
  const {form, setFormField} = useForm({} as Register);
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  const [Init, setInit] = useState(false);
  const lastNameInput = useRef({} as TextInput);
  const emailInput = useRef({} as TextInput);
  const phoneInput = useRef({} as TextInput);
  const passwordInput = useRef({} as TextInput);
  const password2Input = useRef({} as TextInput);

  // useEffect(() => {
  //   if (!Init) {
  //     Alert.alert(
  //       'Atención!',
  //       'Sagi Atlas es una app que utiliza servicios de google e instagram para facilitarte la vida y no pedirte tantos datos. Recomendamos mucho iniciar sesión con instagram, de no ser posible, con google',
  //       [
  //         {
  //           text: 'Registrarme igual',
  //         },
  //         {
  //           text: 'Iniciar sesión con google/instagram',
  //           onPress: () => {
  //             navigation.navigate('LoginScreen');
  //           },
  //         },
  //       ],
  //     );
  //     setInit(true);
  //   }
  // });

  useEffect(() => {
    if (errorMessage.length < 1) return;
    Alert.alert('Acceso denegado', errorMessage, [
      {
        text: 'ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    Keyboard.dismiss();
    if (!(form.password === form.password2)) {
      Alert.alert('Error', 'Las constraseñas no coinciden');
      return;
    }
    signUp(form.email, form.password, form.name, form.lastName, form.phone);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{...global.flexy, backgroundColor: '#E77536'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={userForm.formContainer}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={userForm.title}>Registrarse</Text>
            </View>
            <View style={global.container}>
              <Text style={userForm.label}>Nombre:</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  placeholder="Nombre"
                  placeholderTextColor={'rgba(255,255,255,0.4)'}
                  underlineColorAndroid={'white'}
                  style={{...userForm.inputText, flex: 1}}
                  autoCapitalize={'words'}
                  autoCorrect={false}
                  onChangeText={value => setFormField(value, 'name')}
                  value={form.name}
                  onSubmitEditing={() => lastNameInput.current.focus()}
                />
                <TextInput
                  ref={lastNameInput}
                  placeholder="Apellido (opcional)"
                  placeholderTextColor={'rgba(255,255,255,0.4)'}
                  underlineColorAndroid={'white'}
                  style={{...userForm.inputText, flex: 1}}
                  autoCapitalize={'words'}
                  autoCorrect={false}
                  onChangeText={value => setFormField(value, 'lastName')}
                  value={form.lastName}
                  onSubmitEditing={() => emailInput.current.focus()}
                />
              </View>
              <View style={{height: 15}} />
              <Text style={userForm.label}>Email:</Text>
              <TextInput
                ref={emailInput}
                placeholder="Email"
                placeholderTextColor={'rgba(255,255,255,0.4)'}
                keyboardType="email-address"
                underlineColorAndroid={'white'}
                style={userForm.inputText}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={value => setFormField(value, 'email')}
                value={form.email}
                blurOnSubmit={false}
                onSubmitEditing={() => phoneInput.current.focus()}
              />
              <View style={{height: 15}} />
              <Text style={userForm.label}>
                Teléfono: 9 + {'<'}cod. area{'>'} + numero
              </Text>
              <TextInput
                ref={phoneInput}
                placeholder="Telefono (opcional) "
                placeholderTextColor={'rgba(255,255,255,0.4)'}
                keyboardType="email-address"
                underlineColorAndroid={'white'}
                style={userForm.inputText}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={value => setFormField(value, 'phone')}
                value={form.phone}
                blurOnSubmit={false}
                onSubmitEditing={() => passwordInput.current.focus()}
              />
              <View style={{height: 15}} />
              <Text style={userForm.label}>Contraseña:</Text>
              <TextInput
                ref={passwordInput}
                secureTextEntry
                placeholder="Ingrese su contraseña"
                placeholderTextColor={'rgba(255,255,255,0.4)'}
                underlineColorAndroid={'white'}
                style={userForm.inputText}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={value => setFormField(value, 'password')}
                value={form.password}
                onSubmitEditing={() => password2Input.current.focus()}
              />
              <View style={{height: 15}} />
              <Text style={userForm.label}>Repita contraseña:</Text>
              <TextInput
                ref={password2Input}
                secureTextEntry
                placeholder="Repita su contraseña"
                placeholderTextColor={'rgba(255,255,255,0.4)'}
                underlineColorAndroid={'white'}
                style={userForm.inputText}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={value => setFormField(value, 'password2')}
                value={form.password2}
                onSubmitEditing={onRegister}
              />
            </View>

            <View style={userForm.buttonContainer}>
              <TouchableOpacity
                style={userForm.button}
                activeOpacity={0.8}
                onPress={onRegister}>
                <Text style={userForm.buttonText}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{...userForm.registerButtoncontainer, marginBottom: 30}}>
              <TouchableOpacity
                style={{marginRight: 30}}
                activeOpacity={0.8}
                onPress={() => navigation.replace('LoginScreen')}>
                <Text style={userForm.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;
