import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FormCart = ({
  cartItems,
  updateQuantity,
  removeItem,
  currencyFormat,
}: any) => {
  return (
    <View className="flex flex-1 px-1.5 py-4">
      {cartItems.map((item: any, index: number) => (
        <View
          key={index}
          className="flex px-5 flex-row items-center py-4 space-x-6 border-b border-slate-200 rounded-lg bg-white">
          <Image
            source={{ uri: item?.image }}
            alt={item?.title}
            className="w-20 h-20 rounded-lg object-cover bg-gray-100"
          />

          <View>
            <Text className="text-xs font-medium text-gray-900 truncate">
              {item?.title}
            </Text>
            <Text className="text-sm text-gray-500">
              Rp {currencyFormat(item?.price)}
            </Text>
          </View>

          <View className="flex flex-col items-center px-4 space-x-1 space-y-1">
            <TouchableOpacity
              aria-label="Decrease quantity"
              onPress={() => updateQuantity(index, -1)}
              className="p-1 rounded-full hover:bg-gray-100">
              <Ionicons name="remove-outline" size={24} color="black" />
            </TouchableOpacity>

            <Text className="w-8 text-center text-gray-900">
              {item.quantity}
            </Text>

            <TouchableOpacity
              aria-label="Increase quantity"
              onPress={() => updateQuantity(index, 1)}
              className="p-1 rounded-full hover:bg-gray-100">
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              aria-label="Delete item"
              onPress={() => removeItem(index)}
              className="p-1 rounded-full hover:bg-gray-100 ml-2">
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default FormCart;
