import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import useStatusBar from '@/app/hooks/useStatusBar';
import colors from '@/app/constants/colors';
import currencyFormat from '@/app/utils/currencyFormat';
import NotFound from '@/app/components/Empty';
import { updateCartItems } from '@/app/reducers/cartSlice';
import Button from '@/app/components/Button';
import FormCart from '@/app/components/Form/FormCart';
import ScrollEvent from '@/app/components/ScrollEvent';

const AddCart = () => {
  const navigation = useNavigation<any>();
  useStatusBar('dark-content', colors.white);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Minimal Desk Lamp',
      price: 89.99,
      quantity: 1,
      image: '/api/placeholder/100/100',
    },
    {
      id: 2,
      title: 'Modern Coffee Table',
      price: 299.99,
      quantity: 2,
      image: '/api/placeholder/100/100',
    },
  ]);

  const updateQuantity = async (index: number, change: number) => {
    const newItems = cartItems.map((item, i) =>
      i === index ?
        { ...item, quantity: Math.max(1, item.quantity + change) }
      : item,
    );
    setCartItems(newItems);
    try {
      await AsyncStorage.setItem('my-cart', JSON.stringify(newItems));
    } catch (e) {
      alert(`Error updating storage: ${e}`);
    }
  };

  const removeItem = async (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    try {
      await AsyncStorage.setItem('my-cart', JSON.stringify(newItems));
      dispatch(updateCartItems(newItems));
    } catch (e) {
      alert(`Error removing item from storage: ${e}`);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item?.price * item?.quantity,
    0,
  );

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-cart');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setCartItems(data);
      }
    });
  }, [getData]);

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderCart = (
    <ScrollEvent style={{ backgroundColor: colors.slate, flex: 1 }}>
      <View className="px-6 py-4 bg-white shadow-sm">
        <Text className="text-2xl font-semibold text-gray-900">
          Keranjang Belanja
        </Text>
        <Text className="text-sm text-gray-500">{cartItems.length} item</Text>
      </View>

      <FormCart
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        currencyFormat={currencyFormat}
      />

      <View className="bg-white shadow-lg">
        <View className="px-6 pt-6 flex justify-between mb-4">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="text-gray-900 font-medium">
            Rp {currencyFormat(total.toFixed(0))}
          </Text>
        </View>
        <View className="mx-4">
          <Button handlePress={handleCheckout} text="Checkout" />
        </View>
      </View>
    </ScrollEvent>
  );

  return (
    <>
      {cartItems.length > 0 ?
        renderCart
      : <NotFound
          title="Keranjang Belanja Kosong"
          message="Yuk Mulai Belanja 🙏"
        />
      }
    </>
  );
};

export default AddCart;
