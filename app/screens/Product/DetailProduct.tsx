import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import useStatusBar from '@/app/hooks/useStatusBar';
import colors from '@/app/constants/colors';
import firebaseConfig from '@/firebaseConfig';
import { updateCartItems } from '@/app/reducers/cartSlice';
import { useDispatch } from 'react-redux';
import ProductDetail from '@/app/components/Products/ProductDetail';
import ScrollEvent from '@/app/components/ScrollEvent';

const DetailProduct = () => {
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  const db = getFirestore(firebaseConfig);
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    params && setProduct(params?.item);
  }, [params]);

  useStatusBar(
    modalVisible ? 'light-content' : 'dark-content',
    modalVisible ? colors.black : colors.white,
  );

  const handleClickImage = () => {
    setModalVisible(!modalVisible);
  };

  const getRecommendProducts = async () => {
    try {
      setLoading(true);
      setProductList([]);
      const q = query(
        collection(db, 'Product'),
        where('userEmail', '==', params?.item.userEmail),
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        if (doc.data().title !== params?.item.title) {
          setProductList((productList: any) => [...productList, doc.data()]);
        }
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    params && getRecommendProducts();
  }, [params]);

  const handleAddCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('my-cart');
      let cartItems = [];

      if (existingCart) {
        cartItems = JSON.parse(existingCart);
      }

      const productExists = cartItems.some(
        (item: any) => item.title === product.title,
      );

      if (!productExists) {
        const productWithQuantity = {
          ...product,
          quantity: 1,
        };
        cartItems.push(productWithQuantity);
        await AsyncStorage.setItem('my-cart', JSON.stringify(cartItems));
        dispatch(updateCartItems(cartItems));
        Alert.alert('Sukses', 'Produk berhasil ditambahkan ke keranjang');
        navigation.navigate('CartNav');
      } else {
        Alert.alert('Gagal', 'Produk sudah dikeranjang');
        navigation.navigate('CartNav');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScrollEvent style={{ flex: 1 }}>
        <ProductDetail
          user={user}
          product={product}
          productList={productList}
          loading={loading}
          handleAddCart={handleAddCart}
          handleClickImage={handleClickImage}
        />
      </ScrollEvent>
      <Modal
        visible={!!modalVisible}
        transparent={true}
        onRequestClose={handleClickImage}>
        <View className="flex-1 justify-center items-center h-full w-full bg-black bg-opacity-50">
          <TouchableOpacity
            className="absolute top-4 right-4"
            onPress={handleClickImage}>
            <Ionicons name="close" size={25} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: product.image }}
            className="h-[420px] w-full"
            resizeMode="contain"
          />
        </View>
      </Modal>
    </>
  );
};

export default DetailProduct;
