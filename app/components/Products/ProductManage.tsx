import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import currencyFormat from '@/app/utils/currencyFormat';
import { Ionicons } from '@expo/vector-icons';

const ProductManage = ({ item, handlePress }: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      className="flex-1 m-2 p-2 rounded-lg 
    border-[1px] bg-white border-slate-200"
      onPress={() => navigation.navigate('ProductDetail', { item })}>
      <View className="m-[-9px]">
        <Image
          source={{ uri: item.image }}
          className="w-full h-[140px] rounded-t-lg"
        />
      </View>
      <View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          className="text-base mt-2.5 text-ellipsis break-words">
          {item.title}
        </Text>
        <Text className="text-lg font-bold">
          Rp {currencyFormat(item.price)}
        </Text>
        <Text className="text-indigo-500 bg-indigo-100 mt-1 p-1 text-center rounded-full px-1 text-[10px] w-[70px]">
          {item.category}
        </Text>
        <View className="flex flex-row justify-end mt-2">
          <TouchableOpacity
            onPress={handlePress}
            className="rounded-full p-1 bg-red-100">
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductManage;
