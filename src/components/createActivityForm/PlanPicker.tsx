import React, {useState, useContext, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  arrayDeleteOne,
  arrayAddOne,
  arrayModifyOne,
} from '../../helpers/ArrayStateManager';
import {Plan, Week} from '../../interfaces/ActivityInterfaces';
import PlanTinkerer from './PlanTinkerer';
import {CreatedActivitiesContext} from '../../context/CreatedActivitiesContext';

interface Props {
  plans: Plan[];
  setActivityPlans: (plans: Plan[]) => void;
}

interface PlanTabProps {
  item: Plan;
  index: number;
  erase: (index: number) => void;
}

//TODO: cargar planes cuando es update
//TODO: investigar código hecho de animación para la creacion de las tabs (tipo  google chrome)
//TODO: una actividad no puede terminar antes de que empieze
//TODO: chequear bien esto del plazo máximo

const PlanPicker = ({plans, setActivityPlans}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActivityPlans(plans);
  }, [plans]);

  const tinkerer = useCallback(() => {
    return (
      <PlanTinkerer
        plan={plans[activeIndex]}
        sendPlan={(plan: Plan) => {
          setActivityPlans([...arrayModifyOne(plans, plan, activeIndex)]);
        }}
      />
    );
  }, [activeIndex, plans]);

  const addPlan = () => {
    setActivityPlans([
      ...arrayAddOne(plans, {
        days: [] as Week[],
      } as Plan),
    ]);
  };

  const erasePlan = (index: number) => {
    //corre el seleccionado, según nuevo length
    if (index < activeIndex) {
      setActiveIndex(activeIndex - 1);
    }
    const array = arrayDeleteOne(plans, index);
    setActivityPlans([...array]);
  };

  const PlanTabs = ({index, erase}: PlanTabProps) => {
    const backgroundColor = index === activeIndex ? '#d1d1d1' : '#EAEAEA';
    const color = index === activeIndex ? 'black' : '#7B7B7B';

    return (
      <TouchableOpacity
        style={{...TabBarStyles.box, backgroundColor}}
        activeOpacity={0.8}
        onPress={() => {
          setActiveIndex(index);
        }}>
        <Text style={{...TabBarStyles.text, color}}>Plan {index + 1}</Text>
        <Pressable
          onPress={() => {
            erase(index);
          }}>
          <Icon name="close" color={'#7B7B7B'} size={20} />
        </Pressable>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <AddButton addPlan={addPlan} />
        <FlatList
          horizontal
          keyExtractor={(item, index) => index.toString()}
          data={plans}
          renderItem={({item, index}) => (
            <PlanTabs
              item={item}
              index={index}
              erase={() => erasePlan(index)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          extraData={activeIndex}
        />
      </View>
      {plans.length > 0 ? tinkerer() : null}
    </View>
  );
};

const AddButton = ({addPlan}: any) => {
  return (
    <TouchableOpacity
      onPress={addPlan}
      activeOpacity={0.8}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
      }}>
      <Icon name="add" color="rgba(0, 0, 0, 0.6)" size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    height: 35,
    backgroundColor: '#EAEAEA',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderBottomColor: '#d1d1d1',
    borderBottomWidth: 2,
    elevation: 5,
  },
});

const TabBarStyles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    paddingVertical: 3,
  },
  text: {
    fontSize: 18,
    marginHorizontal: 4,
    paddingBottom: 4,
  },
});

export default PlanPicker;
