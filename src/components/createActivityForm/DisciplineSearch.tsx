import CheckBox from '@react-native-community/checkbox';
import React, {useContext, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import * as lodash from 'lodash';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {ActivityForm} from '../../theme/FormTheme';
import {useDebouncedValue} from '../../hooks/useDebouncedValue';
import {DisciplineContext} from '../../context/DisciplineContext';
import {SimpleDiscipline} from '../../interfaces/DisciplineInterfaces';
import SelectedItemBox from './SelectedItemBox';
import ResultsFlatList from './ResultsFlatList';
import {arrayDeleteOne, arrayAddOne} from '../../helpers/ArrayStateManager';

const DisciplineSearch = () => {
  const {activity, setActivityField} = useContext(CreatedActivitiesContext);
  const {debounceSearch} = useContext(DisciplineContext);

  const [checked, setChecked] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [text, setText] = useState('');
  const [results, setResults] = useState<SimpleDiscipline[]>([]);
  const [selected, setSelected] = useState<SimpleDiscipline[]>(
    activity?.disciplines ? activity.disciplines : [],
  );
  const searchTerm = useDebouncedValue(text);

  useEffect(() => {
    loadResults();
  }, [searchTerm]);

  useEffect(() => {
    if (activity?.disciplines) {
      if (activity.disciplines.length > 1) {
        setChecked(true);
      }
    }
  }, []);

  const loadResults = async () => {
    setLoadingResults(true);
    debounceSearch(searchTerm)
      .then(results => {
        setResults(results);
        setLoadingResults(false);
      })
      .catch(e => console.log(e));
  };

  const select = (array: SimpleDiscipline[]) => {
    setSelected(array);
    setActivityField(array, 'disciplines');
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          marginTop: 25,
        }}>
        <Text style={{...ActivityForm.label, marginTop: 0, paddingTop: 5}}>
          {checked ? 'Categorías:' : 'Categoría:'}{' '}
          {/*TODO: disicplina???? categoria =) ? */}
        </Text>
        <View style={{flex: 1}} />

        <Text style={{paddingTop: 7}}>más de una</Text>
        <CheckBox
          value={checked}
          onValueChange={newValue => setChecked(newValue)}
          tintColors={{true: '#c96026'}}
        />
      </View>

      <View>
        <View
          style={{
            ...ActivityForm.inputContainer,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            onFocus={() => setFocused(true)}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
            placeholder={'Buscar por categoría'}
            style={ActivityForm.inputText}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={value => setText(value)}
            blurOnSubmit={true}
          />
          {!checked && selected[0] ? (
            <SelectedItemBox<{id: number; name: string; toString: () => string}>
              item={{
                ...selected[0],
                toString: () => {
                  return selected[0].name;
                },
              }}
              erase={() => {
                setSelected([...arrayDeleteOne(selected, 0)]);
              }}
            />
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
          }}>
          {checked
            ? selected.map((result, index) => {
                //si hay más de una se renderizan abajo
                return (
                  <SelectedItemBox<{
                    id: number;
                    name: string;
                    toString: () => string;
                  }>
                    style={{marginHorizontal: 5, marginTop: 10}}
                    key={index}
                    item={{
                      ...result,
                      toString: () => {
                        return selected[index].name;
                      },
                    }}
                    erase={() => {
                      select(
                        lodash.uniqBy(arrayDeleteOne(selected, index), 'name'),
                      );
                    }}
                  />
                );
              })
            : null}
        </View>

        <View
          style={{position: 'absolute', top: 45, zIndex: 10, width: '100%'}}>
          {focused ? ( //buscador de resultados
            checked ? ( //añade al array (muchas)
              <ResultsFlatList
                results={results}
                isLoading={loadingResults}
                select={(item: SimpleDiscipline) => {
                  select(lodash.uniqBy(arrayAddOne(selected, item), 'name'));
                  setFocused(false);
                }}
              />
            ) : (
              //reemplaza el que ya está (solo uno)
              <ResultsFlatList
                results={results}
                isLoading={loadingResults}
                select={(item: SimpleDiscipline) => {
                  select([item]);
                  setFocused(false);
                }}
              />
            )
          ) : null}
        </View>
      </View>
    </>
  );
};

export default DisciplineSearch;
