import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '@/app/constants/colors';
import AddCart from '@/app/screens/Cart';
import Payment from '@/app/screens/Payment';

const Stack = createStackNavigator();

const PaymentStackNav = () => {
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
        name="Cart"
        component={AddCart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Payment}
        options={() => ({
          animation: 'slide_from_right',
          title: 'Checkout',
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

export default PaymentStackNav;
