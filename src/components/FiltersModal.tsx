import MultiSlider, {LabelProps} from '@ptomasroos/react-native-multi-slider';
import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addDaytoWeekString,
  removeDayFromWeekString,
} from '../helpers/stringParser';
import {
  SearchActivityRequestData,
  Week,
} from '../interfaces/ActivityInterfaces';
import {SimpleDiscipline} from '../interfaces/DisciplineInterfaces';
import CustomMultiSlider from './CustomMultiSlider';
import {DichotomyButtons} from './DichotomyButtons';
import {DisciplineSearchModal} from './DisciplineSearchModal';
import ToggleDayButton from './toggleDayButton';

interface Props {
  filters: SearchActivityRequestData;
  setFilters: (newState: SearchActivityRequestData) => void;
  open: boolean;
  close: () => void;
  reset: () => void;
  search: () => void;
}
//TODO: filtro de horarios
const FiltersModal = ({
  filters,
  setFilters,
  open,
  close,
  reset,
  search,
}: Props) => {
  const [disciplinesOpen, setDisciplinesOpen] = useState(false);

  const undoTermFilter = () => {
    setFilters({term: undefined});
  };

  const undoDisciplineFilter = () => {
    setFilters({discipline: undefined});
  };

  const closeDisciplines = () => {
    setDisciplinesOpen(false);
  };

  const addWeekDay = (day: Week) => {
    const weekString = addDaytoWeekString(day, filters.weekDays);
    setFilters({weekDays: weekString});
  };

  const eraseWeekDay = (day: Week) => {
    const weekString = removeDayFromWeekString(day, filters.weekDays);
    setFilters({weekDays: weekString});
  };
  return (
    <Modal visible={open} animationType="slide">
      <View style={{margin: 20}}>
        <View style={{height: 60}} />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            search();
            close();
          }}>
          <Icon name="filter" color={'white'} size={22} />
          <Text style={styles.buttonText}>{'  '}Filtrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            reset();
            close();
          }}>
          <Icon name="refresh" color={'white'} size={22} />
          <Text style={styles.buttonText}>{'  '}Reset</Text>
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <TextInput
            style={{fontSize: 16}}
            placeholder="Buscar por nombre"
            value={filters.term}
            onChangeText={text => {
              setFilters({term: text});
            }}
          />
          {filters.term ? (
            <Pressable
              onPress={undoTermFilter}
              style={styles.deleteTextSelectionButton}>
              <Icon name="close-outline" color="white" size={20} />
            </Pressable>
          ) : null}
        </View>
        <View style={{height: 25}} />

        <TouchableOpacity
          style={styles.textInputContainer}
          onPress={() => setDisciplinesOpen(true)}>
          <TextInput
            style={{fontSize: 18, color: 'black'}}
            placeholder="Filtrar por disciplina"
            value={filters.discipline?.name}
            editable={false}
          />
          {filters.discipline ? (
            <Pressable
              onPress={undoDisciplineFilter}
              style={styles.deleteTextSelectionButton}>
              <Icon name="close-outline" color="white" size={20} />
            </Pressable>
          ) : null}
        </TouchableOpacity>
        <DisciplineSearchModal
          open={disciplinesOpen}
          close={closeDisciplines}
          select={(discipline: SimpleDiscipline) => {
            setFilters({discipline});
          }}
        />
        <View style={{height: 25}} />
        <Text style={styles.labelText}>Precio</Text>
        <CustomMultiSlider
          step={500}
          first={{
            value: filters.minPrice,
            min: 0,
            minLabel: 'Gorra',
          }}
          second={{
            value: filters.maxPrice,
            max: 5000,
          }}
          setChanges={values => {
            setFilters({
              minPrice: values[0],
              maxPrice: values[1],
            });
          }}
        />
        <View style={{height: 25}} />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelText}>Fechas</Text>
          <Text style={{fontSize: 16, marginTop: 3}}>
            {' '}
            - desde hoy a 28 días
          </Text>
        </View>
        <CustomMultiSlider
          first={{
            value: filters.afterSetDays,
            min: 0,
            minLabel: 'hoy',
          }}
          second={{
            value: filters.beforeSetDays,
            max: 28,
          }}
          setChanges={values => {
            setFilters({
              afterSetDays: values[0],
              beforeSetDays: values[1],
            });
          }}
        />
        <View style={{height: 25}} />
        <Text style={styles.labelText}>Cantidad de gente</Text>

        <CustomMultiSlider
          first={{
            value: filters.minQuota,
            min: 1,
          }}
          second={{
            value: filters.maxQuota,
            max: 100,
            maxLabel: 'Todo',
          }}
          setChanges={values => {
            setFilters({
              minQuota: values[0],
              maxQuota: values[1],
            });
          }}
        />

        <View style={{height: 25}} />

        <View>
          <DichotomyButtons
            value={filters.repeatable}
            onPress1={() => {
              setFilters({repeatable: false});
            }}
            onPress2={() => {
              setFilters({repeatable: true});
            }}
            title1={'De una sola vez'}
            title2={'Se repite'}
          />
        </View>
      </View>
      <View style={{height: 25}} />
      <Text style={{alignSelf: 'center', marginBottom: 5}}>
        solo para "se repite"
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'space-around',
          marginHorizontal: 4,
        }}>
        {Object.values(Week).map(day => {
          if (
            filters.weekDays?.includes(day.toString()) &&
            filters.repeatable
          ) {
            return (
              <ToggleDayButton
                disabled={false}
                selected={true}
                key={day.toString()}
                day={day}
                add={addWeekDay}
                erase={eraseWeekDay}
              />
            );
          }
          return (
            <ToggleDayButton
              disabled={filters.repeatable ? false : true}
              key={day.toString()}
              day={day}
              add={addWeekDay}
              erase={eraseWeekDay}
            />
          );
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: 'red',
    bottom: 30,
  },
  labelText: {
    fontSize: 18,
    marginLeft: 8,
    marginBottom: 6,
    color: 'black',
  },
  textInputContainer: {
    paddingLeft: 10,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    flexDirection: 'row',
  },
  deleteTextSelectionButton: {
    position: 'absolute',
    right: 15,
    height: 24,
    width: 24,
    borderRadius: 26,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b8b6b6',
  },
  resetButton: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    borderRadius: 13,
    right: 0,
  },
  filterButton: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#E77536',
    padding: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    borderRadius: 13,
  },
  buttonText: {fontSize: 18, color: 'white', fontWeight: '600'},
});
export default FiltersModal;
