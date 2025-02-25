import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import useStatusBar from '@/app/hooks/useStatusBar';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  useStatusBar('dark-content', colors.white, true);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const menuProfile: {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    route?: string;
    handlePress?: () => void;
  }[] = [
    {
      title: 'Produk Saya',
      icon: 'briefcase-outline',
      route: 'MyProduct',
      handlePress: () => navigation.navigate('MyProduct'),
    },
    {
      title: 'Jelajahi Commuplace',
      icon: 'globe-outline',
      handlePress: () => navigation.navigate('ExploreNav'),
    },
    {
      title: 'Tentang Kami',
      icon: 'information-circle-outline',
      handlePress: () => alert('Commuplace tempat untuk beli dan jual barang'),
    },
  ];

  const renderMenu = () => {
    return menuProfile.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={item?.handlePress}
        className="w-full flex flex-row bg-white mb-3.5 items-center rounded-lg justify-between border border-slate-200 py-2.5 px-3">
        <Text className="text-center text-gray-600">{item.title}</Text>
        <Ionicons name={item.icon} size={24} color="gray" />
      </TouchableOpacity>
    ));
  };

  return (
    <View className="flex-1 bottom-28 justify-center items-center bg-white p-5">
      <View className="w-full flex flex-row items-center bg-white border border-slate-200 rounded-xl p-4 mb-4">
        <Image
          resizeMode="contain"
          alt="profile"
          className="w-[68px] h-[68px] rounded-full"
          source={{ uri: user?.imageUrl }}
        />
        <View className="ml-4 align-middle">
          <Text className="text-lg font-semibold">{user?.fullName}</Text>
          <Text className="text-base text-gray-500">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>
      {renderMenu()}
      <TouchableOpacity
        onPress={handleLogout}
        className="absolute bottom-10 w-full flex flex-row bg-white mb-4 items-center rounded-lg justify-between border border-red-300 py-2 px-3">
        <Text className="text-center text-red-600">Keluar</Text>
        <Ionicons name="log-out-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
