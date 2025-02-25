import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseConfig from '@/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import colors from '@/app/constants/colors';
import useStatusBar from '@/app/hooks/useStatusBar';
import images from '@/app/constants/images';
import FormProduct from '@/app/components/Form/FormProduct';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,

    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    textAlignVertical: 'top',
    fontSize: 17,
  },
});

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Judul wajib diisi'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().required('Price is required'),
});

const AddProduct = () => {
  const db = getFirestore(firebaseConfig);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const { user } = useUser();
  useStatusBar('dark-content', colors.white, true);

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleChangeImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        allowsMultipleSelection: false,
      });
      return result.canceled ? null : setImage(result.assets[0].uri);
    } catch (error) {
      throw error;
    }
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const handleSaveProduct = async (value: any, resetForm: any) => {
    try {
      setLoading(true);
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, 'imageproduct/' + Date.now() + '.jpg');
      uploadBytes(storageRef, blob).then(async (snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await addDoc(collection(db, 'Product'), {
            title: value.title,
            description: value.description,
            price: value.price,
            category: value.category,
            image: url,
            userName: user?.fullName,
            userImage: user?.imageUrl,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: new Date(),
          })
            .then((docRef) => {
              if (docRef.id) {
                Alert.alert('Success', 'Product has been added successfully');
                setLoading(false);
                setImage(null);
                resetForm();
              }
            })
            .catch((error) => {
              throw error;
            });
        });
      });
    } catch (error) {
      throw error;
    }
  };

  const initialValues = {
    title: '',
    description: '',
    price: '',
    category: '',
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <FormProduct
            initialValues={initialValues}
            handleSaveProduct={handleSaveProduct}
            handleChangeImage={handleChangeImage}
            image={image}
            categoryList={categoryList}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProduct;
