import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductManage from '@/app/components/Products/ProductManage';

const ListItems = ({ data, handleOnTap, title }: any) => {
  return (
    <View className="mt-3 px-2.5">
      <Text className="font-bold text-lg ml-2">{title}</Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ProductManage
            handlePress={() => handleOnTap(item?.title)}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default ListItems;
