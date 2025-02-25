import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '@/app/constants/colors';
import DetailProduct from '@/app/screens/Product/DetailProduct';
import Explore from '@/app/screens/Explore';

const Stack = createStackNavigator();

const ExploreStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}>
      <Stack.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={DetailProduct}
        options={() => ({
          animation: 'slide_from_right',
          title: '',
          headerTintColor: colors.black,
          headerStyle: {
            elevation: 5,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            backgroundColor: colors.white,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default ExploreStackNav;
