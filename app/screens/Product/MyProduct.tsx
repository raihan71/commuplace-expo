import React, { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import ListItems from '@/app/components/ListItems/ListMyProduct';
import firebaseConfig from '@/firebaseConfig';
import NotFound from '@/app/components/Empty';
import Loading from '@/app/components/Loading';
import { useUser } from '@clerk/clerk-expo';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyProduct = () => {
  const db = getFirestore(firebaseConfig);
  const navigation = useNavigation<any>();
  const { user } = useUser();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user && getMyProduct();
  }, [user]);

  const getMyProduct = async () => {
    setProducts([]);
    setLoading(true);
    const q = query(
      collection(db, 'Product'),
      where('userEmail', '==', user?.primaryEmailAddress?.emailAddress),
    );
    const snapshot = await getDocs(q);
    setLoading(false);
    snapshot.forEach((doc) => {
      setProducts((productList) => [...productList, doc.data()]);
      setLoading(false);
    });
  };

  const handleDeleteData = (title: string) => {
    Alert.alert('Hapus Produk', 'Kamu yakin ingin menghapus produk ini?', [
      {
        text: 'Yes',
        onPress: () => deleteFromFirestore(title),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  const deleteFromFirestore = async (title: string) => {
    const q = query(collection(db, 'Product'), where('title', '==', title));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then(() => {
        setProducts((productList) =>
          productList.filter((product) => product.title !== title),
        );
        navigation.navigate('MyProduct');
      });
    });
  };

  return (
    <>
      {loading ?
        <Loading />
      : products.length > 0 ?
        <ScrollView className="bg-white">
          <ListItems
            handleOnTap={handleDeleteData}
            data={products}
            title={`Manajemen Produk 📦`}
          />
        </ScrollView>
      : <NotFound />}
    </>
  );
};

export default MyProduct;
