import axios, {AxiosError} from 'axios';
import React, {createContext, useEffect, useReducer} from 'react';
import {Text} from 'react-native';
import api from '../api/sagiApi';
import {authReducer} from '../hooks/AuthReducer';
import {AuthResponse, User} from '../interfaces/AuthInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import parseErrorMessages from '../helpers/parseError';
import {Asset} from 'react-native-image-picker';

export interface AuthState {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
}

const authInit: AuthState = {
  errorMessage: '',
  token: null,
  user: null,
  status: 'checking',
};

export type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (
    email: string,
    password: string,
    nombre: string,
    lastName?: string,
    phone?: string,
  ) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  removeError: () => void;
  updateProfilePic: (file: Asset) => void;
  refreshUser: () => Promise<void>;
};
export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInit);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({type: 'authentication-fail'});
    //hay token
    try {
      var response = await api.get<AuthResponse>('/auth');
    } catch (e) {
      await AsyncStorage.removeItem('token');
      console.log(e);
      return dispatch({type: 'authentication-fail'});
    }

    if (response.status !== 200) return dispatch({type: 'authentication-fail'});
    //el token es válido
    const {data} = response;
    dispatch({
      type: 'signUp',
      payload: {token: data.token, user: data.user},
    });
    await AsyncStorage.setItem('token', data.token);
  };

  const refreshUser = checkToken;

  const signUp = async (
    email: string,
    password: string,
    name: string,
    lastName?: string,
    phone?: string,
  ) => {
    try {
      const {
        data: {token, user},
      } = await api.post<AuthResponse>('/auth/register', {
        email,
        password,
        name,
        ...(lastName && {lastName}),
        ...(phone && {phone}),
      });
      dispatch({type: 'signUp', payload: {user, token}});
      await AsyncStorage.setItem('token', token);
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        // @ts-ignore
        const errorMessage = parseErrorMessages(error.response!.data!.message);
        dispatch({type: 'addError', payload: errorMessage});
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const {
        data: {user, token},
      } = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      dispatch({type: 'signUp', payload: {user, token}});
      await AsyncStorage.setItem('token', token);
      return 'ok';
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        // @ts-ignore
        if (error.response!.data!.message) {
          const errorMessage = parseErrorMessages(
            // @ts-ignore
            error.response!.data!.message,
          );
          dispatch({type: 'addError', payload: errorMessage});
        }
      }
    }
  };
  const signOut = async () => {
    dispatch({type: 'signOut'});
    await AsyncStorage.removeItem('token');
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  const updateProfilePic = async ({fileName, type, uri}: Asset) => {
    const imageData = new FormData();
    try {
      imageData.append('file', {
        name: fileName,
        type: type,
        uri: uri,
      });
      const result = await api.put<string>('/image/user', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.debug('resposne: ' + result.data);
      dispatch({
        type: 'profilePicChange',
        payload: {user: state.user!, picUrl: result.data},
      });
    } catch (e: any) {
      console.log(JSON.stringify(e, null, 5));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signOut,
        removeError,
        updateProfilePic,
        refreshUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
