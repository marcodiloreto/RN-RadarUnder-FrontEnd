import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {arrayDeleteOne} from '../../helpers/ArrayStateManager';
import {ActivityForm} from '../../theme/FormTheme';

interface Props {
  item: {id: number; url: string} | Asset;
  index: number;
}

interface ImageProps {
  uri: string;
  index: number;
  id?: number;
}
//TODO: borrar imagenes!!! necesito el id! el backend actualmente no lo retorna!
const ImagePicker = () => {
  const {activity, setActivityField, uploadImages, deleteImage} = useContext(
    CreatedActivitiesContext,
  );
  const [images, setImages] = useState<(Asset | {id: number; url: string})[]>(
    [],
  );

  useEffect(() => {
    if (activity?.images) {
      setImages(activity.images);
    }
  }, []);

  const selectImages = (
    array: (Asset | {id: number; url: string})[],
    image?: Asset,
  ) => {
    setImages(array);
    setActivityField(array, 'images');
    if (image && activity?.id) {
      uploadImages([image], activity.id);
    }
  };

  const takeLibraryPhoto = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, ({assets}) => {
      //este array nunca tiene más de una posicion
      if (assets) {
        if (activity?.id) {
          //metodo para añadir imagen a actividad existente
          selectImages([...images, ...assets], assets[0]);
        } else {
          //metodo para crear la actividad
          selectImages([...images, ...assets]);
        }
      }
    });
  };

  const RenderItem = ({item, index}: Props) => {
    if ('url' in item) {
      return <ImageItem uri={item.url} id={item.id} index={index} />;
    }
    return <ImageItem uri={item.uri!} index={index} />;
  };

  const ImageItem = ({uri, index, id}: ImageProps) => {
    return (
      <View style={{height: 180, width: 180}}>
        <Image style={{height: 180, width: 180}} source={{uri}} />
        <Pressable
          onPress={() => {
            selectImages([...arrayDeleteOne(images, index)]);
            if (id) {
              deleteImage(id);
            }
          }}
          style={{
            width: 25,
            height: 25,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}>
          <Icon name="close" color="rgba(0, 0, 0, 0.6)" size={19} />
        </Pressable>
      </View>
    );
  };

  const ListFooter = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonContainer}
        onPress={takeLibraryPhoto}>
        <Icon name="add-circle" size={30} color={'#d1d1d1'} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Text style={ActivityForm.label}>Imágenes:</Text>
      <View style={styles.container}>
        <FlatList<Asset | {id: number; url: string}>
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => {
            return <ListFooter />;
          }}
          data={images}
          renderItem={({item, index}) => {
            return <RenderItem item={item} index={index} />;
          }}
          horizontal
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonContainer: {
    height: 180,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edebeb',
  },
  separator: {
    width: 10,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'lightgrey',
  },
});

export default ImagePicker;
