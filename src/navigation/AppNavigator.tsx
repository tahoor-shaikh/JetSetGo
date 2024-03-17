import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  pageFlightDetails,
  pageHome,
  pageNameFlightDetails,
  pageNameHome,
} from './Routes';

const Stack = createStackNavigator();
const AppNavigator = () => {
  const screenOption: object = {
    headerShown: false,
    animation: 'slide_from_right',
    animationDuration: 500,
  };

  return (
    <Stack.Navigator
      screenOptions={screenOption}
      initialRouteName={pageNameHome}>
      <Stack.Screen name={pageNameHome} component={pageHome} />
      <Stack.Screen
        name={pageNameFlightDetails}
        component={pageFlightDetails}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
