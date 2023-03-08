import React, {useContext, useEffect, useRef} from 'react';
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

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

interface Login {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: Props) => {
  const {form, setFormField} = useForm<Login>({} as Login);
  const {signIn, errorMessage, removeError} = useContext(AuthContext);
  const passwordInput = useRef({} as TextInput);

  useEffect(() => {
    if (errorMessage.length < 1) return;
    Alert.alert('Acceso denegado', errorMessage, [
      {
        text: 'ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    signIn(form.email, form.password);
  };

  return (
    <KeyboardAvoidingView
      style={global.flexy}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={userForm.formContainer}>
          <LoginBackground />
          <WhiteLogo />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={userForm.title}> Login</Text>
          </View>
          <View style={global.container}>
            <Text style={userForm.label}>Email:</Text>
            <TextInput
              placeholder="Ingrese su Email"
              placeholderTextColor={'rgba(255,255,255,0.4)'}
              keyboardType="email-address"
              underlineColorAndroid={'white'}
              style={userForm.inputText}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={value => setFormField(value, 'email')}
              value={form.email}
              blurOnSubmit={false}
              onSubmitEditing={() => passwordInput.current.focus()}
            />
            <View style={{height: 30}} />
            <Text style={userForm.label}>Password:</Text>
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
              onSubmitEditing={onLogin}
            />
          </View>
          <View style={userForm.buttonContainer}>
            <TouchableOpacity
              style={userForm.button}
              activeOpacity={0.8}
              onPress={onLogin}>
              <Text style={userForm.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={userForm.registerButtoncontainer}>
            <TouchableOpacity
              style={{marginRight: 30}}
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={userForm.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
