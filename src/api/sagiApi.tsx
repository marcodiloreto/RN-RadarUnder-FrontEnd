import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASEURL = 'http://178.128.155.87:3000';

const api = axios.create({
  baseURL: BASEURL,
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers!['authorization'] = 'Bearer ' + token;
  }
  return config;
});

export default api;
