import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import colors from '@/app/constants/colors';
import currencyFormat from '@/app/utils/currencyFormat';
import Collection from '@/app/components/HomeScreen/Collection';
import Loading from '@/app/components/Loading';
import Button from '@/app/components/Button';

const ProductDetail = ({
  product,
  productList,
  loading,
  handleClickImage,
  user,
  handleAddCart,
}: any) => {
  return (
    <>
      <TouchableOpacity onPress={handleClickImage}>
        <Image source={{ uri: product.image }} className="h-[320px] w-full" />
      </TouchableOpacity>
      <View className="bg-white mb-2">
        <View className="p-3">
          <Text className="text-xl font-bold">
            Rp {currencyFormat(product?.price)}
          </Text>
          <Text className="text-lg text-ellipsis break-words">
            {product?.title}
          </Text>
          <View className="items-baseline">
            <Text className=" bg-indigo-200 p-1 mt-2 px-2 rounded-full text-indigo-500">
              {product.category}
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white mb-2">
        <View className="p-3">
          <Text className="font-bold text-lg">Deskripsi</Text>
          <Text className="text-lg text-gray-500">{product?.description}</Text>
        </View>
      </View>

      <View className="bg-white mb-3">
        <View className="p-3">
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: product?.userImage }}
              className="h-10 w-10 rounded-full"
            />
            <View className="m-2">
              <Text className="text-gray-500 ml-1.5">{product?.userName}</Text>
              <View className="flex flex-row items-center ml-1">
                <Ionicons name="star" color="orange" size={18} />
                <Text className="text-xs text-gray-500 ml-1">4.3/5</Text>
              </View>
            </View>
          </View>
        </View>
        {!loading ?
          productList.length > 0 ?
            <Collection
              background={colors.white}
              data={productList}
              flashSale={false}
              header={
                <View className="flex flex-row items-center">
                  <Text className="font-bold text-lg">
                    Lainnya dari penjual ini
                  </Text>
                </View>
              }
            />
          : ''
        : <Loading />}
      </View>

      {user?.primaryEmailAddress?.emailAddress !== product?.userEmail ?
        <View className="bg-white">
          <View className="mx-4">
            <Button
              handlePress={() => handleAddCart(product)}
              text="Tambah ke keranjang"
            />
          </View>
        </View>
      : <View className="h-5 bg-white" />}
    </>
  );
};

export default ProductDetail;
