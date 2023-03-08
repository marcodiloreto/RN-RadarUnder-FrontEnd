import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SimpleDiscipline} from '../../interfaces/DisciplineInterfaces';

interface Props {
  results: SimpleDiscipline[];
  select: (item: SimpleDiscipline) => void;
  isLoading: boolean;
}

const ResultsFlatList = ({results, select, isLoading}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        top: -10,
        paddingBottom: 2,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      }}>
      {isLoading ? (
        <ActivityIndicator style={{margin: 10}} size={30} color={'grey'} />
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
              onPress={() => {
                select(item);
              }}
            />
          )}
        />
      )}
    </View>
  );
};

interface ItemProps {
  item: SimpleDiscipline;
  onPress: () => void;
}

const RenderItem = ({item, onPress}: ItemProps) => {
  return (
    <TouchableOpacity style={{padding: 5}} onPress={onPress}>
      <Text style={{fontSize: 16, marginLeft: 20}}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ResultsFlatList;
