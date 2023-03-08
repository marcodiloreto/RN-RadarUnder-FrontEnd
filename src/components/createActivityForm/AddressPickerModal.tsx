import React, {useEffect, useState, useCallback} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../../hooks/useDebouncedValue';
import {ActivityForm} from '../../theme/FormTheme';
import useLocation from '../../hooks/useLocation';
import {
  Address,
  AutocompleteResult,
  Location,
} from '../../interfaces/LocationInterfaces';
import {makeAddressObject} from '../../helpers/LocationParser';

interface Props {
  open: boolean;
  close: () => void;
  select: (address: Address) => void;
}

const AddressPickerModal = ({open, close, select}: Props) => {
  const [text, setText] = useState<string>('');
  const searchTerm = useDebouncedValue(text);
  const {initialPosition, autocompletePlaces, geocode} = useLocation();
  const [results, setResults] = useState<AutocompleteResult[]>([]);

  useEffect(() => {
    if (searchTerm != '') searchAddress(searchTerm);
  }, [searchTerm]);

  const selectAddress = async (item: AutocompleteResult) => {
    const response = await geocode(item.place_id);
    select(makeAddressObject(item.description, response.data));
    close();
  };

  const searchAddress = async (term: string) => {
    const response = await autocompletePlaces(term, initialPosition);
    setResults(response.data);
  };

  return (
    <Modal animationType="slide" visible={open} style={{flex: 1}}>
      <KeyboardAvoidingView style={{margin: 20}}>
        <Pressable onPress={close} style={{marginLeft: 10}}>
          <Icon name="close-outline" color="black" size={40} />
        </Pressable>
        <Text style={ActivityForm.title}>Ingrese la dirección</Text>
        <View style={{height: 50, marginTop: 10}}>
          <TextInput
            placeholder="Dirección"
            placeholderTextColor={'rgba(0,0,0,0.4)'}
            underlineColorAndroid={'rgba(0,0,0,0.7)'}
            style={ActivityForm.inputText}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={value => setText(value)}
            value={text}
            blurOnSubmit={false}
          />
        </View>

        <FlatList
          data={results}
          renderItem={({index, item}) => (
            <RenderItem
              key={index}
              item={item}
              onPress={() => selectAddress(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

interface RenderItemProps {
  item: AutocompleteResult;
  onPress: () => void;
}
const RenderItem = ({item, onPress}: RenderItemProps) => {
  return (
    <TouchableOpacity
      style={styles.itemList}
      onPress={onPress}
      activeOpacity={0.8}>
      <Icon name="location-outline" size={30} color={'rgba(0,0,0,0.7)'} />
      <Text style={styles.label}>{item.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  separator: {
    borderTopColor: 'rgba(0,0,0,0.5)',
    borderTopWidth: 1,
  },
});

export default AddressPickerModal;
