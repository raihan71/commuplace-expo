import React from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import useAutoScroll from '@/app/hooks/useAutoScroll';

const Banner = ({ data }: any) => {
  const screenWidth = Dimensions.get('window').width;
  const { setCurrentIndex, flatListRef } = useAutoScroll(data);

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth - 40, // width of item + padding
    offset: (screenWidth - 40) * index,
    index,
  });
  return (
    <View className="mt-5">
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={data}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const contentOffset = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(contentOffset / (screenWidth - 40));
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item, index }) => (
          <View
            className="h-auto"
            key={index}
            style={{
              marginRight: index === data.length - 1 ? 0 : 15,
            }}>
            <Image
              source={{ uri: item?.image }}
              className="bg-red-300 rounded-lg"
              width={320}
              height={110}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

export default Banner;
