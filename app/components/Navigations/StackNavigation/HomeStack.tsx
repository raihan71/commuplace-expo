import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '@/app/constants/colors';
import { CategoryProduct, ProductDetail, Home } from '@/app/screens';

const Stack = createStackNavigator();

const HomeScreenStackNav = () => {
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
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CategoryProduct"
        component={CategoryProduct}
        options={({ route }: any) => ({
          animation: 'slide_from_right',
          title: route.params.category,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
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

export default HomeScreenStackNav;
