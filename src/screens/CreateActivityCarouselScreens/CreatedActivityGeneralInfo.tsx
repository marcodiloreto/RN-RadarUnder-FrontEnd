import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';
import {ActivityForm} from '../../theme/FormTheme';
import DescTextInput from '../../components/createActivityForm/DescTextInput';
import DisciplineSearch from '../../components/createActivityForm/DisciplineSearch';
import ImagePicker from '../../components/createActivityForm/ImagePicker';
import {PriceInput} from '../../components/createActivityForm/PriceInput';
import {QuotaInput} from '../../components/createActivityForm/QuotaInput';

const CreatedActivityGeneralInfo = () => {
  const {activity, setActivityField} = useContext(CreatedActivitiesContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        style={{
          overflow: 'visible',
          position: 'relative',
          paddingBottom: 100,
        }}>
        <Text style={{...ActivityForm.label, marginTop: 0}}>Nombre:</Text>
        <View style={ActivityForm.inputContainer}>
          <TextInput
            placeholder="Ingrese nombre"
            placeholderTextColor={'rgba(0,0,0,0.4)'}
            style={ActivityForm.inputText}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={value => setActivityField(value, 'name')}
            value={activity!.name}
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <DescTextInput />
        <PriceInput />
        <QuotaInput />
        <DisciplineSearch />
        <ImagePicker />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    height: 20,
    width: 20,
  },
});
export default CreatedActivityGeneralInfo;
