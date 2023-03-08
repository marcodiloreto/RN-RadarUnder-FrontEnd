import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  parseFromLocationObject,
  parseToLocationObject,
} from '../../helpers/LocationParser';
import useLocation from '../../hooks/useLocation';
import {Address, Location} from '../../interfaces/LocationInterfaces';
import {labeledMapStyleObject} from '../../theme/mapStyleObject';

interface Props {
  open: boolean;
  close: () => void;
  select: (address: Address) => void;
  selectedAddress: Address | undefined;
}

export const PointPickerModal = ({
  open,
  close,
  select,
  selectedAddress,
}: Props) => {
  const {initialPosition, reverseGeocode, setupRegion} = useLocation();
  const [marker, setMarker] = useState<Location>(
    selectedAddress
      ? {lat: selectedAddress.lat, lng: selectedAddress.lng}
      : ({} as Location),
  );

  useEffect(() => {
    if (selectedAddress)
      setMarker({lat: selectedAddress.lat, lng: selectedAddress.lng});
  }, [selectedAddress]);

  const selectPoint = async () => {
    const address = await reverseGeocode(marker);
    select(address);
    close();
  };

  return (
    <Modal animationType="slide" visible={open} style={{flex: 1}}>
      <View
        style={{
          top: 20,
          left: 20,
          position: 'absolute',
          zIndex: 200,
          height: 45,
          width: 45,
          borderRadius: 50,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable onPress={close}>
          <Icon name="close-outline" color="black" size={40} />
        </Pressable>
      </View>
      <MapView
        style={{flex: 1}}
        customMapStyle={labeledMapStyleObject}
        onPress={ev =>
          setMarker(parseToLocationObject(ev.nativeEvent.coordinate))
        }
        onLongPress={ev =>
          setMarker(parseToLocationObject(ev.nativeEvent.coordinate))
        }
        region={setupRegion(selectedAddress)}
        rotateEnabled={false}>
        {marker?.lat ? (
          <Marker pinColor="red" coordinate={parseFromLocationObject(marker)} />
        ) : null}
      </MapView>

      <TouchableOpacity
        onPress={() => selectPoint()}
        activeOpacity={0.8}
        style={{
          padding: 10,
          borderRadius: 15,
          backgroundColor: '#E77536',
          marginTop: 20,
          marginBottom: 2,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 20,
          width: 300,
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 20, marginLeft: 10}}>Seleccionar punto</Text>
        <View style={{flex: 1}} />
        <Icon
          name={'locate-outline'}
          color={'black'}
          size={24}
          style={{marginRight: 20}}
        />
      </TouchableOpacity>
    </Modal>
  );
};
