import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/app/constants/colors';

const NotFound = ({
  message = 'Data tidak ditemukan',
  title = 'Oopss',
}: any) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Ionicons name="alert-circle-outline" size={50} color={colors.primary} />
      <Text className="text-lg font-bold">{title}</Text>
      <Text className="font-medium">{message}</Text>
    </View>
  );
};

export default NotFound;
