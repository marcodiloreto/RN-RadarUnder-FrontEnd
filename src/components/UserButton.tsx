import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import UserDefault from './UserDefault';

interface Props {
  modalManage: () => void;
}

const UserButton = ({modalManage}: Props) => {
  const {user} = useContext(AuthContext);
  return (
    <TouchableOpacity
      style={styles.profilePic}
      activeOpacity={0.8}
      onPress={modalManage}>
      {user?.profilePicUrl ? (
        <Image source={{uri: user.profilePicUrl}} style={styles.imageSize} />
      ) : (
        <View style={styles.imageSize}>
          <UserDefault name={user?.name} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    height: 45,
    width: 45,
    borderRadius: 1000,
    elevation: 10,
    overflow: 'hidden',
    marginRight: 20,
  },
  imageSize: {
    height: 45,
    width: 45,
  },
});
export default UserButton;
