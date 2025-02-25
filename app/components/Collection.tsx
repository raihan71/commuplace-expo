import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import currencyFormat from '../utils/currencyFormat';
import images from '../constants/images';
import formatTime from '../utils/countDown';

const Collection = ({ data }: any) => {
  const [timeLeft, setTimeLeft] = useState(6600);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <View className="mt-3.5 pb-3.5 bg-yellow-100 rounded-lg">
      <View className="flex flex-row items-center justify-between px-4 py-3">
        <View className="flex flex-row items-center">
          <Image source={images.image.flashsale} />
          <Text className="font-bold text-lg ml-2"></Text>
          <Text className="font-bold text-lg">{formatTime(timeLeft)}</Text>
        </View>
        <Text className="text-xs">Semua</Text>
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
            <View>
              <Image
                source={{ uri: item?.image }}
                className="rounded-lg"
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text className="mt-1">
                <Text className="text-xs">Rp</Text>{' '}
                <Text className="text-sm font-bold">
                  {currencyFormat(item?.price)}
                </Text>
              </Text>
              <View className="bg-red-200 rounded-full h-1.5">
                <View
                  className="bg-red-500 h-1.5 rounded-full"
                  style={{ width: `70%` }}
                />
              </View>
              <Text className="text-xs">Cepat habis</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Collection;
