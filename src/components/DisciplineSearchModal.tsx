import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {DisciplineContext} from '../context/DisciplineContext';
import {SimpleDiscipline} from '../interfaces/DisciplineInterfaces';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  open: boolean;
  close: () => void;
  select: (discipline: SimpleDiscipline) => void;
}

export const DisciplineSearchModal = ({select, open, close}: Props) => {
  const [term, setTerm] = useState<string>();
  const {debounceSearch} = useContext(DisciplineContext);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SimpleDiscipline[]>([]);

  const debouncedTerm = useDebouncedValue(term);

  useEffect(() => {
    setLoading(true);
    debounceSearch(debouncedTerm)
      .then(value => {
        setResults(value);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, [debouncedTerm]);

  return (
    <Modal animationType="slide" visible={open} style={{flex: 1}}>
      <KeyboardAvoidingView style={{margin: 20}}>
        <Pressable onPress={close} style={{marginLeft: 10}}>
          <Icon name="close-outline" color="black" size={40} />
        </Pressable>
        <View style={styles.textInputContainer}>
          <TextInput
            style={{fontSize: 18, color: 'black'}}
            placeholder="Filtrar por disciplina"
            value={term}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={text => setTerm(text)}
            blurOnSubmit={false}
          />
        </View>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={'black'} size={40} />
          </View>
        ) : results.length < 1 ? (
          <View style={styles.loading}>
            <Text style={{fontSize: 16, color: 'black'}}>Sin resultados</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: 'lightgrey',
                  marginHorizontal: 3,
                }}
              />
            )}
            renderItem={({item}) => (
              <RenderItem
                item={item}
                select={() => {
                  select(item);
                  close();
                }}
              />
            )}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

interface RenderItemProps {
  item: SimpleDiscipline;
  select: () => void;
}
const RenderItem = ({item, select}: RenderItemProps) => {
  return (
    <TouchableOpacity
      style={styles.itemList}
      onPress={select}
      activeOpacity={0.8}>
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    paddingLeft: 10,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4d4d4',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  itemList: {
    marginLeft: 3,
    marginRight: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 18,
    color: 'rgba(0,0,0,0.7)',
  },
});
