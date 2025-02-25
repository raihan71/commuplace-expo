import React from 'react';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSegments } from 'expo-router';
import colors from '@/app/constants/colors';
import { AddProduct } from '@/app/screens';
import {
  HomeStack,
  ExploreStack,
  PaymentStack,
  ProfileStack,
} from '@/app/components/Navigations/StackNavigation';

const Tab = createBottomTabNavigator();

const tabConfig = [
  {
    name: 'HomeNav',
    component: HomeStack,
    label: 'Beranda',
    icon: 'home',
  },
  {
    name: 'ExploreNav',
    component: ExploreStack,
    label: 'Jelajah',
    icon: 'globe',
  },
  {
    name: 'CartNav',
    component: PaymentStack,
    label: 'Keranjang',
    icon: 'cart',
    showBadge: true,
  },
  {
    name: 'AddProduct',
    component: AddProduct,
    label: 'Upload',
    icon: 'camera',
  },
  {
    name: 'ProfileNav',
    component: ProfileStack,
    label: 'Akun Saya',
    icon: 'person',
  },
];

const TabNavigation = () => {
  const segments: string[] = useSegments();
  const screensWithHiddenTabs = [
    'ProductDetail',
    'CategoryProduct',
    'Checkout',
  ];
  const badgeCount = useSelector((state: any) => state.cart.badgeCount);
  const hide = screensWithHiddenTabs.some((screen) =>
    segments.includes(screen),
  );

  const getTabOptions = (item: (typeof tabConfig)[0]) => ({
    tabBarActiveTintColor: colors.primary,
    tabBarBadge: item.showBadge && badgeCount > 0 ? badgeCount : null,
    tabBarLabel: ({ color }: { color: string }) => (
      <Text
        style={{
          color: color,
          fontSize: 12,
          marginLeft: 2,
        }}>
        {item.label}
      </Text>
    ),
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
      const iconName = focused ? item.icon : `${item.icon}-outline`;
      return (
        <Ionicons
          style={{ marginLeft: 2 }}
          name={iconName as keyof typeof Ionicons.glyphMap}
          size={24}
          color={color}
        />
      );
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="HomeNav"
      safeAreaInsets={{ bottom: Platform.OS === 'ios' ? 0 : 10 }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: hide ? 'none' : 'flex',
        },
      }}>
      {tabConfig.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={getTabOptions(item)}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
