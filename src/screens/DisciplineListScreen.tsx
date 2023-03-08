import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {BottomTabsParams} from '../navigators/BottomTabsNavigator';
import useDisciplineList from '../hooks/useDisciplineList';
import {DisciplineListItem} from '../interfaces/DisciplineInterfaces';
import LoadingScreen from './LoadingScreen';
import CollapsibleList from '../components/CollapsibleList';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from '../components/FadeInImage';

interface Props
  extends BottomTabScreenProps<BottomTabsParams, 'DisciplineListScreen'> {}

const DisciplineListScreen = ({navigation}: Props) => {
  const {width} = useWindowDimensions();
  const {loading, disciplinesList} = useDisciplineList();
  const renderItemWidth = width / 2 - 40;

  const nav = (id: number) => {
    // @ts-ignore
    navigation.navigate('AppStackNavigator', {
      screen: 'DisciplineScreen',
      params: {id: id},
    });
  };

  const renderLists = useCallback(() => {
    return disciplinesList.map(section => {
      return (
        <CollapsibleList
          key={section.parent.id}
          data={section.list}
          title={section.parent.name}
          numberOfLines={2}
          containerStyle={styles.headerContainer}
          titleStyle={styles.headerTitle}
          renderItem={({item}) => (
            <RenderItem
              item={item}
              nav={id => {
                nav(id);
              }}
              width={renderItemWidth}
            />
          )}
          ListEmptyComponent={() => <View />}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListFooterComponent={() => <View style={{height: 20}} />}
        />
      );
    });
  }, [disciplinesList]);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <ScrollView>{renderLists()}</ScrollView>
      <RequestButton navigation={navigation} />
    </>
  );
};

interface RenderItemProps {
  item: DisciplineListItem;
  nav: (id: number) => void;
  width: number;
}

const RenderItem = ({item, nav, width}: RenderItemProps) => {
  const bottom = item.name.length >= 17 ? 50 : 30;

  return (
    <TouchableOpacity
      style={{...styles.itemContainer, width}}
      onPress={() => nav(item.id)}>
      {item.iconUrl ? (
        <FadeInImage
          style={{height: 130, width: width - 20, left: 20}}
          uri={item.iconUrl}
        />
      ) : null}

      <View
        style={{
          position: 'absolute',
          left: 13,
          right: 10,
          bottom: bottom,
          zIndex: 100,
        }}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const requestAlert = (
  navigation: BottomTabNavigationProp<
    BottomTabsParams,
    'DisciplineListScreen',
    undefined
  >,
) => {
  return Alert.alert(
    '¿No encuentras la categoría que te gusta?',
    'Mandanos una solicitud, con solo el nombre alcanza. Nosotros lo revisamos y lo añadimos a la app. Tambien podés pedirnos que cambiemos la descripción de una disciplina ya existente',
    [
      {text: 'cancelar', onPress: () => {}},
      {
        text: 'enviar solicitud',
        onPress: () => {
          // @ts-ignore
          navigation.navigate('AppStackNavigator', {
            screen: 'RequestScreen',
          });
        },
      },
    ],
  );
};

interface ButtonProps {
  navigation: BottomTabNavigationProp<
    BottomTabsParams,
    'DisciplineListScreen',
    undefined
  >;
}
const RequestButton = ({navigation}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => requestAlert(navigation)}>
      <Icon name="alert-sharp" size={36} color="#ffffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002D62',
  },
  itemContainer: {
    height: 150,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f5d4f5',
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  itemSeparator: {
    margin: 10,
  },
  itemText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
    position: 'absolute',
    elevation: 10,
  },
  headerContainer: {
    width: '100%',
    elevation: 10,
    borderRadius: 3,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F4',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F4',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    margin: 10,
  },
});

export default DisciplineListScreen;
