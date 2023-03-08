import {StackNavigationProp} from '@react-navigation/stack';
import {Alert, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../api/sagiApi';
import {CreateRequestData} from '../interfaces/RequestInterfaces';
import {AppStackParams} from '../navigators/AppStackNavigator';
import {useForm} from './useForm';

const useDisciplineRequest = (
  navigation: StackNavigationProp<AppStackParams, 'RequestScreen', undefined>,
) => {
  const {form: request, setFormField: setRequestField} = useForm(
    {} as CreateRequestData,
  );

  const sendRequest = async () => {
    try {
      await api.post('/request', request);
      return Alert.alert(
        'Solicitud enviadada',
        'Pronto la estaremos revisando, ¡Gracias por tu aporte!',
        [{text: 'ok', onPress: () => {}}],
      );
    } catch (e) {
      console.log(e);
      return Alert.alert(
        'Error',
        'No fue posible enviar la solicitud. Por favor intentá más tarde. ',
        [{text: 'llorar', onPress: () => {}}],
      );
    }
  };

  return {
    request,
    setRequestField,
    sendRequest,
  };
};

export default useDisciplineRequest;
