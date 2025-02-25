import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import images from '@/app/constants/images';
import Button from '@/app/components/Button';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  category: Yup.string().required('Category is required'),
});

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
  },
});

const FormProduct = ({
  initialValues,
  handleSaveProduct,
  handleChangeImage,
  image,
  categoryList,
  loading,
}: any) => {
  return (
    <View className="px-5 bg-white">
      <Text className="font-semibold text-lg">Tambah Produk Baru</Text>
      <Text className="text-base text-gray-500 mb-2.5">
        Buat produk baru untuk dijual
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          handleSaveProduct(values, resetForm)
        }>
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
          values,
        }: any) => (
          <View>
            <TouchableOpacity className="pb-2" onPress={handleChangeImage}>
              {image ?
                <Image
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                  source={{ uri: image }}
                />
              : <Image
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                  source={images.image.placeholder}
                />
              }
            </TouchableOpacity>
            <TextInput
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nama Produk"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              style={styles.input}
            />
            {errors.title && touched.title ?
              <Text className="text-red-500">{errors.title}</Text>
            : ''}
            <TextInput
              className="h-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Deskripsi"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              numberOfLines={10}
              multiline={true}
              style={styles.input}
            />
            {errors.description && touched.description ?
              <Text className="text-red-500">{errors.description}</Text>
            : ''}
            <TextInput
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Harga"
              keyboardType="number-pad"
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              style={styles.input}
            />
            {errors.price && touched.price ?
              <Text className="text-red-500">{errors.price}</Text>
            : ''}
            <View className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-3">
              <Picker
                selectedValue={values.category}
                onValueChange={(val) => setFieldValue('category', val)}
                mode="dropdown">
                <Picker.Item label="Pilih kategori" value="" />
                {categoryList.length > 0 &&
                  categoryList?.map((item: any, index: number) => (
                    <Picker.Item
                      key={index}
                      label={item?.name}
                      value={item?.name}
                    />
                  ))}
              </Picker>
            </View>
            {errors.category && touched.category ?
              <Text className="text-red-500">{errors.category}</Text>
            : ''}
            <Button
              handlePress={handleSubmit}
              text="Simpan"
              isLoading={loading}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default FormProduct;
