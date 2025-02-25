import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import firebaseConfig from '@/firebaseConfig';
import Header from '@/app/components/HomeScreen/Header';
import Banner from '@/app/components/HomeScreen/Banner';
import Category from '@/app/components/HomeScreen/Category';
import ListProduct from '@/app/components/ListItems/ListProduct';
import FlashSale from '@/app/components/HomeScreen/Collection';
import colors from '@/app/constants/colors';
import images from '@/app/constants/images';
import timerCountDown from '@/app/utils/countDownTimer';
import useStatusBar from '@/app/hooks/useStatusBar';
import Loading from '@/app/components/Loading';
import ScrollEvent from '@/app/components/ScrollEvent';

const Home = () => {
  useStatusBar('dark-content', colors.white, true);
  const db = getFirestore(firebaseConfig);
  const [banners, setBanners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newProducts, setNewProducts] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(6600);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sliderDocs, categoryDocs, productDocs] = await Promise.all([
        getDocs(collection(db, 'Slider')),
        getDocs(collection(db, 'Category')),
        getDocs(query(collection(db, 'Product'), orderBy('createdAt', 'desc'))),
      ]);
      setBanners(sliderDocs.docs.map((doc) => doc.data()));
      setCategories(categoryDocs.docs.map((doc) => doc.data()));
      setNewProducts(productDocs.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      {!loading ?
        <ScrollEvent
          style={{ backgroundColor: colors.white, flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchData}
              colors={[colors.primary]}
            />
          }>
          <SafeAreaView className="mb-2">
            <Header />
            <Banner data={banners} />
            <Category data={categories} title="Kategori" />
            <FlashSale
              background={colors.yellow}
              data={newProducts}
              flashSale={true}
              header={
                <View className="flex flex-row items-center">
                  <Image source={images.image.flashsale} />
                  <Text className="font-bold text-lg mx-1.5">🎉</Text>
                  <Text className="font-bold text-lg">
                    {timerCountDown(timeLeft)}
                  </Text>
                </View>
              }
            />
            <ListProduct data={newProducts} title="Paling Baru" />
          </SafeAreaView>
        </ScrollEvent>
      : <Loading />}
    </>
  );
};

export default Home;
