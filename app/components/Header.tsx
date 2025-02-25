import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function Header() {
  const { user } = useUser();
  return (
    <View className="px-5 pt-1.5">
      <View className="flex flex-row items-center gap-2.5 space-y-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text className="text-base">Selamat Datang</Text>
          <Text className="text-lg font-bold">{user?.fullName}</Text>
        </View>
      </View>

      <View
        className="px-5 flex flex-row 
        items-center bg-indigo-50 mt-4 rounded-full border-[1px] border-indigo-200">
        <Ionicons name="search" size={24} color={colors.primary} />
        <TextInput
          placeholder="Cari Produk"
          className="ml-2 text-[18px]"
          onChangeText={(value) => console.log(value)}
        />
      </View>
    </View>
  );
}
