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
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // Slide animation from right
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
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
