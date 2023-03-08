import React, {useContext, useEffect} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import useProfileImageManager from '../hooks/ProfileImageManager';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomTabsParams} from '../navigators/BottomTabsNavigator';
import UserDefault from './UserDefault';

interface Props {
  open: boolean;
  close: () => void;
  navigation: BottomTabNavigationProp<
    BottomTabsParams,
    'SearchScreen',
    undefined
  >;
}

const UserModal = ({open, close, navigation}: Props) => {
  const {user, signOut, refreshUser} = useContext(AuthContext);
  const {pickPic} = useProfileImageManager();

  const logOut = () => {
    close();
    signOut();
  };

  return (
    <Modal animationType="slide" visible={open} transparent={true}>
      <>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={close}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        <View style={styles.modalSize}>
          <View style={styles.profilePicContainer}>
            {user?.profilePicUrl ? (
              <Image
                style={styles.profilePic}
                source={{uri: user.profilePicUrl}}
              />
            ) : (
              <View style={{...styles.profilePic, overflow: 'hidden'}}>
                <UserDefault name={user?.name} />
              </View>
            )}
          </View>
          <View style={{marginLeft: 220, marginTop: 10}}>
            <Text style={styles.nameText}>
              {user?.name} {user?.lastName}
            </Text>
          </View>
          <View
            style={{
              zIndex: -1,
              marginTop: 10,
              width: '100%',
              height: 1,
              elevation: 2,
              backgroundColor: '#d4f5d4',
            }}
          />
          <TouchableOpacity
            style={{...styles.button, marginTop: 100}}
            activeOpacity={0.8}
            onPress={pickPic}>
            <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button}}
            activeOpacity={0.8}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('AppStackNavigator', {
                screen: 'ModifyUserDataScreen',
                params: {id: user?.id},
              });
            }}>
            <Text style={styles.buttonText}>
              Modificar informacion de usuario
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.refreshButton}
            onPress={refreshUser}>
            <Icon name="refresh" color={'black'} size={28} />
            <View style={{width: 10}} />
            <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
              refresh
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={logOut}>
            <Icon name="log-out-outline" color="white" size={30} />
            <View style={{width: 10}} />
            <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalSize: {
    height: '70%',
    width: '100%',
    elevation: 10,
    backgroundColor: 'white',
  },
  profilePicContainer: {
    height: 180,
    width: 180,
    borderRadius: 1000,
    position: 'absolute',
    left: 20,
    top: -90,
    backgroundColor: 'white',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    height: 160,
    width: 160,
    borderRadius: 1000000,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7)',
  },
  button: {
    height: 50,
    elevation: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 25,
  },
  logoutButton: {
    height: 50,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 15,
    backgroundColor: '#002D62',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
  },
  refreshButton: {
    height: 50,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
  },
});

export default UserModal;
