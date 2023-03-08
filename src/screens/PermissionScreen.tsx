import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {permissionContext, PermissionState} from '../context/PermissionContext';

export const PermissionScreen = () => {
  const {permission, requestLocationPermission} = useContext(permissionContext);

  // useEffect(() => {}, [permission]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario otorgar permisos al GPS para usar esta applicación
      </Text>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.blackButton}
        onPress={requestLocationPermission}>
        <Text style={styles.buttonText}>{'Entiendo'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    width: 250,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
});
