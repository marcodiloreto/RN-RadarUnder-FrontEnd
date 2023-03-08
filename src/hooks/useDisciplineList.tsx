import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import api from '../api/sagiApi';
import {
  DisciplineSectionListData,
  DisciplineListResponse,
} from '../interfaces/DisciplineInterfaces';

export const useDisciplineList = () => {
  const [loading, setLoading] = useState(false);
  const [disciplinesList, setDisciplineList] =
    useState<DisciplineSectionListData>([]);

  useEffect(() => {
    loadDisciplines();

    return () => {
      undefined;
    };
  }, []);

  const loadDisciplines = async () => {
    setLoading(true);
    try {
      const resp = await api.get<DisciplineListResponse>('/discipline');
      const parsedData = parseResponse(resp.data);
      console.debug('parsedData');
      console.debug(JSON.stringify(parsedData, null, 5));
      setDisciplineList(parsedData);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      return Alert.alert('Error', 'No se pudo obtener la lista de disciplinas');
    }
  };

  const parseResponse = (data: DisciplineListResponse) => {
    var parsedData: DisciplineSectionListData = [];
    for (let i = 1; i <= 4; i++) {
      const parent = data.find(dis => dis.id === i)!;
      const list = data.filter(dis => dis.parents.find(p => p.parentId === i));
      parsedData.push({parent, list});
    }
    return parsedData;
  };

  return {
    disciplinesList,
    loading,
  };
};

export default useDisciplineList;
