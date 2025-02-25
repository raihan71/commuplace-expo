import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PostItem from './PostItem';

const ListItems = ({ data, heading }: any) => {
  return (
    <View className="mt-3 px-2.5">
      <Text className="font-bold text-lg ml-2">{heading}</Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PostItem item={item} />}
      />
    </View>
  );
};

export default ListItems;
