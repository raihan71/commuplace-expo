import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '@/app/constants/colors';
import Profile from '@/app/screens/Profile';
import MyProduct from '@/app/screens/Product/MyProduct';
import DetailProduct from '@/app/screens/Product/DetailProduct';

const Stack = createStackNavigator();

const ProfileStackNav = () => {
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
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyProduct"
        component={MyProduct}
        options={() => ({
          animation: 'slide_from_right',
          title: 'Produk Saya',
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

export default ProfileStackNav;
