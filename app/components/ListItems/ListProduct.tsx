import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Product from '@/app/components/Products/ProductItem';

const ListProduct = ({ title, data }: any) => {
  return (
    <View className="mt-3 px-2.5">
      <Text className="font-bold text-lg ml-2">{title}</Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Product item={item} />}
      />
    </View>
  );
};

export default ListProduct;
