import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import api from '../api/sagiApi';
import {
  FullUserData,
  PasswordUpdateData,
  UserUpdateData,
} from '../interfaces/UserInterfaces';
import {useForm} from './useForm';

export const useUserModificationHandler = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<FullUserData | undefined>();
  const {form: modifications, setFormField: setModification} =
    useForm<UserUpdateData>({});
  const {form: passParams, setFormField: setPassParams} =
    useForm<PasswordUpdateData>({} as PasswordUpdateData);

  useEffect(() => {
    getUser();

    return () => {
      return undefined;
    };
  }, []);

  const sendModification = async () => {
    var flag = false;
    try {
      await api.put('/user/' + id, {...modifications});
      flag = true;
    } catch (e) {
      console.log(e);
    }

    return Alert.alert(
      flag ? 'Éxito!' : 'Error',
      flag
        ? 'Información modificada correctamente, recargue la pestaña para verificar cambios'
        : 'No fue posible guardar los cambios debido a un error en el servidor',
    );
  };
  const changePassword = async () => {
    var flag = false;
    try {
      const resp = await api.put<boolean>('/auth/' + id, {...passParams});
      flag = true;
      const message = resp.data
        ? 'Contraseña cambiada'
        : 'Contraseña incorrecta, no se han efectuado cambios';
    } catch (e) {
      console.log(e);
    }

    return Alert.alert(
      flag ? '' : 'Error',
      flag
        ? 'Contraseña modificada correctamente'
        : 'La contraseña sigue como antes debido a un error en el servidor',
    );
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await api.get<FullUserData>('/user/details/' + id);
      setUser(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return {
    loading,
    user,
    sendModification,
    modifications,
    setModification,
    passParams,
    setPassParams,
    changePassword,
  };
};
