import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  query,
  collection,
  where,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import ListItems from '@/app/components/ListItems/ListProduct';
import colors from '@/app/constants/colors';
import useStatusBar from '@/app/hooks/useStatusBar';
import firebaseConfig from '@/firebaseConfig';
import Loading from '@/app/components/Loading';
import NotFound from '@/app/components/Empty';

const ListCategoryProduct = () => {
  useStatusBar('light-content', colors.primary, true);
  const db = getFirestore(firebaseConfig);
  const { params } = useRoute<any>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getProductCategory = async () => {
    try {
      setLoading(true);
      setProducts([]);
      const q = query(
        collection(db, 'Product'),
        where('category', '==', params?.category),
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        setLoading(false);
        setProducts((productList) => [...productList, doc.data()]);
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductCategory();
  }, []);
  return (
    <>
      {!loading ?
        products?.length > 0 ?
          <ScrollView className="bg-white">
            <ListItems
              data={products}
              title={`Belanja ${params?.category} Yuk 🥳`}
            />
          </ScrollView>
        : <NotFound message={`Produk tidak ditemukan`} />
      : <Loading />}
    </>
  );
};

export default ListCategoryProduct;
