import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ProductMini from '@/app/components/Products/ProductMini';

const Collection = ({ title, flashSale, header, background, data }: any) => {
  return (
    <View className="mt-3 pb-3.5" style={{ backgroundColor: background }}>
      <View className="flex flex-row items-center justify-between px-4 py-3">
        {header}
        <Text className="text-xs">{title}</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 18.5 }}
        data={data}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              marginRight: index === data.length - 1 ? 0 : 15,
            }}>
            <ProductMini isFlashSale={flashSale} item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Collection;
