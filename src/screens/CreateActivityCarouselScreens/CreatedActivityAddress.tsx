import React, {useContext, useEffect, useState, useCallback} from 'react';
import {Keyboard, Text, View, Modal} from 'react-native';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {ActivityForm} from '../../theme/FormTheme';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import AddressPickerModal from '../../components/createActivityForm/AddressPickerModal';
import {Address} from '../../interfaces/LocationInterfaces';
import MapView, {Marker} from 'react-native-maps';
import {labeledMapStyleObject} from '../../theme/mapStyleObject';
import Icon from 'react-native-vector-icons/Ionicons';
import {PointPickerModal} from '../../components/createActivityForm/PointPickerModal';
import useLocation from '../../hooks/useLocation';
import {parseFromLocationObject} from '../../helpers/LocationParser';
import {removeArgentina} from '../../helpers/stringParser';

const CreatedActivityAddress = () => {
  const {activity, setActivityField} = useContext(CreatedActivitiesContext);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [openAddressPicker, setOpenAddressPicker] = useState(false);
  const [openPointPicker, setOpenPointPicker] = useState(false);
  const {setupRegion} = useLocation();

  useEffect(() => {
    if (!selectedAddress && activity?.location) {
      setSelectedAddress(activity.location);
    }
  }, []);

  const marker = useCallback(() => {
    if (activity?.location) {
      return (
        <Marker
          pinColor="red"
          coordinate={parseFromLocationObject(activity.location)}
        />
      );
    }
    return null;
  }, [activity?.location]);

  const select = (address: Address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    setActivityField(selectedAddress!, 'location');
  }, [selectedAddress]);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={ActivityForm.inputContainer}
        activeOpacity={0.8}
        onPress={() => setOpenAddressPicker(true)}>
        <TextInput
          editable={false}
          placeholder="Direccion"
          placeholderTextColor={'rgba(0,0,0,0.4)'}
          style={{...ActivityForm.inputText}}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={
            activity?.location
              ? removeArgentina(activity.location.address)
              : undefined
          }
          blurOnSubmit={true}
          onSubmitEditing={Keyboard.dismiss}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setOpenPointPicker(true)}
        style={{
          padding: 6,
          borderRadius: 5,
          backgroundColor: '#E77536',
          marginTop: 20,
          marginBottom: 2,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 16, marginLeft: 10}}>
          Seleccionar en el mapa
        </Text>
        <View style={{flex: 1}} />
        <Icon
          name={'locate-outline'}
          color={'black'}
          size={24}
          style={{marginRight: 20}}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 500,
          width: 380,
          borderRadius: 8,
        }}>
        <MapView
          customMapStyle={labeledMapStyleObject}
          style={{flex: 1, borderRadius: 8}}
          region={setupRegion(activity?.location)}
          rotateEnabled={false}>
          {marker()}
        </MapView>
      </View>

      <AddressPickerModal
        open={openAddressPicker}
        close={() => setOpenAddressPicker(false)}
        select={select}
      />

      <PointPickerModal
        open={openPointPicker}
        close={() => setOpenPointPicker(false)}
        select={select}
        selectedAddress={selectedAddress}
      />
    </View>
  );
};

export default CreatedActivityAddress;
