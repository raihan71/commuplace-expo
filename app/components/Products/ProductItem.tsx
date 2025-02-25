import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import currencyFormat from '@/app/utils/currencyFormat';

const Product = ({ item }: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { item })}
      className="flex-1 m-2 p-2 rounded-lg 
  border-[1px] bg-white border-slate-200">
      <View className="m-[-9px]">
        <Image
          source={{ uri: item.image }}
          className="w-full h-[140px] rounded-t-lg"
        />
      </View>
      <View>
        <Text className="text-base mt-2.5 text-ellipsis break-words">
          {item.title}
        </Text>
        <Text className="text-lg font-bold">
          Rp {currencyFormat(item.price)}
        </Text>
        <Text className="text-blue-500 bg-blue-100 mt-1 p-1 text-center rounded-full px-1 text-[10px] w-[70px]">
          {item.category}
        </Text>
        <View className="flex flex-row items-center mt-2">
          <Ionicons name="person-circle-outline" size={16} color="gray" />
          <Text className="text-xs text-gray-500 ml-1">{item.userName}</Text>
        </View>
        <View className="mt-1 flex flex-row items-center">
          <Ionicons name="star" color="orange" size={16} />
          <Text className="text-xs text-gray-500 ml-1">4.3/5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
