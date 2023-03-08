import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Props {
  title: string;
  data: any[];
  renderItem: (asd: any) => JSX.Element;
  ListEmptyComponent: () => JSX.Element;
  ItemSeparatorComponent: () => JSX.Element;
  ListFooterComponent: () => JSX.Element;
  containerStyle: ViewStyle;
  titleStyle: TextStyle;
  numberOfLines?: number;
}

const CollapsibleList = ({
  title,
  data,
  renderItem,
  ListEmptyComponent,
  ListFooterComponent,
  ItemSeparatorComponent,
  containerStyle,
  titleStyle,
  numberOfLines = 1,
}: Props) => {
  const [open, setopen] = useState(true);
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setopen(!open);
  };
  return (
    <TouchableOpacity
      style={[containerStyle, !open && {height: 60}]}
      onPress={onPress}
      activeOpacity={1}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...titleStyle, paddingBottom: 1}}>{title}</Text>
        <View
          style={{
            height: 1,
            marginHorizontal: 18,
            flex: 1,
            backgroundColor: 'black',
          }}
        />
        {open ? (
          <Icon name={'caret-down-outline'} size={18} color="black" />
        ) : (
          <Icon name={'caret-back-outline'} size={18} color="black" />
        )}
      </View>
      {open && (
        <FlatList
          numColumns={numberOfLines}
          scrollEnabled={false}
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooterComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
  },
  item: {
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: 20,
    overflow: 'hidden',
    paddingVertical: 10,
    marginBottom: 5,
  },
});

export default CollapsibleList;
