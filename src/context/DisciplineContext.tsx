import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import sagiApi from '../api/sagiApi';
import parseErrorMessages from '../helpers/parseError';
import {} from '../interfaces/ActivityInterfaces';
import axios, {AxiosError} from 'axios';
import {
  SimpleDiscipline,
  CompleteDiscipline,
} from '../interfaces/DisciplineInterfaces';

type DisciplineContextProps = {
  disciplines: CompleteDiscipline[];
  loadDisciplines: () => Promise<void>;
  loadDisciplineById: (id: string) => Promise<void>;
  debounceSearch: (term: string) => Promise<SimpleDiscipline[]>;
};

//TODO: notificacion de aviso al cambio del estado de la actividad (ej: se canceló) a los anotados / interesados
//          NO es lo mismo cancelas una actividad a cancelar un evento.
//              el usuario lo tiene que saber!!!!!

export const DisciplineContext = createContext({} as DisciplineContextProps);

export const DisciplineProvider = ({children}: any) => {
  const [disciplines, setDisciplines] = useState<CompleteDiscipline[]>([]);

  const loadDisciplines = async () => {
    try {
      const resp = await sagiApi.get<CompleteDiscipline[]>('/discipline');
      setDisciplines([...resp.data]);
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        // @ts-ignore
        if (error.response!.data!.message) {
          const errorMessage = parseErrorMessages(
            // @ts-ignore
            error.response!.data!.message,
          );
        }
      }
    }
  };

  const loadDisciplineById = async (id: string) => {
    throw new Error('not implemented');
  };

  const debounceSearch = async (term: string): Promise<SimpleDiscipline[]> => {
    try {
      const resp = await sagiApi.get<SimpleDiscipline[]>(
        `/discipline/debounceSearch${term ? '?text=' + term : ''}`,
      );
      return resp.data;
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        // @ts-ignore
        if (error.response!.data!.message) {
          const errorMessage = parseErrorMessages(
            // @ts-ignore
            error.response!.data!.message,
          );
          throw new Error('error fetching disciplines: ' + errorMessage);
        }
      }
      throw new Error('error fetching disciplines: ');
    }
  };

  return (
    <DisciplineContext.Provider
      value={{
        disciplines,
        loadDisciplines,
        loadDisciplineById,
        debounceSearch,
      }}>
      {children}
    </DisciplineContext.Provider>
  );
};
