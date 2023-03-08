import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import api from '../api/sagiApi';
import {CompleteDiscipline} from '../interfaces/DisciplineInterfaces';

const useDisciplineGetter = (id: number) => {
  const [discipline, setDiscipline] = useState<
    CompleteDiscipline | undefined
  >();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDiscipline();
  }, []);

  const loadDiscipline = async () => {
    setLoading(true);
    try {
      const resp = await api.get<CompleteDiscipline>('/discipline/' + id);
      setDiscipline(resp.data);
    } catch (e) {
      console.log(e);
      return Alert.alert(
        'Error',
        'No fue posible buscar la data de la disciplina',
      );
    }

    setLoading(false);
  };

  return {
    discipline,
    loading,
  };
};

export default useDisciplineGetter;
