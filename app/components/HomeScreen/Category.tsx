import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import colors from '@/app/constants/colors';
import { useNavigation } from '@react-navigation/native';

const Category = ({ title, data }: any) => {
  const navigation = useNavigation<any>();
  return (
    <View className="mt-3.5 px-3">
      <Text className="font-bold text-lg ml-1.5">{title}</Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('CategoryProduct', {
                category: item?.name,
              })
            }
            className="flex-1 items-center justify-center border-[1px] border-indigo-200 h-[80px] rounded-lg bg-blue-50 m-2">
            <Ionicons name={item?.icon} size={24} color={colors.primary} />
            <Text className="text-[12px] mt-1">{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;
