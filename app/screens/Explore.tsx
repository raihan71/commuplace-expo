import React, { useEffect, useState } from 'react';
import {
  getDocs,
  query,
  collection,
  orderBy,
  getFirestore,
} from 'firebase/firestore';
import firebaseConfig from '@/firebaseConfig';
import ListItems from '@/app/components/ListItems/ListProduct';
import colors from '@/app/constants/colors';
import ScrollEvent from '@/app/components/ScrollEvent';

const Explore = () => {
  const [latestItemList, setLatestItemList] = useState<any[]>([]);
  const db = getFirestore(firebaseConfig);

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapShot = await getDocs(
      query(collection(db, 'Product'), orderBy('createdAt', 'desc')),
    );
    querySnapShot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  useEffect(() => {
    getLatestItemList();
  }, []);

  return (
    <ScrollEvent style={{ flex: 1, backgroundColor: colors.white }}>
      <ListItems data={latestItemList} title="Jelajahi Produk 🌐" />
    </ScrollEvent>
  );
};

export default Explore;
