import React from 'react';
import { ActivityIndicator } from 'react-native';
import colors from '@/app/constants/colors';

const Loading = () => {
  return (
    <ActivityIndicator
      className="flex-1 items-center mb-4 bg-white"
      size="large"
      color={colors.primary}
    />
  );
};

export default Loading;
