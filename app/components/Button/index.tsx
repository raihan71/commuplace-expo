import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  handlePress: () => void;
  text: string;
  isLoading?: boolean;
}

const Button = ({ handlePress, text, isLoading }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="fixed bg-indigo-500 rounded-lg p-4 my-4 shadow-lg shadow-indigo-500/50">
      <Text className="text-white text-center font-semibold">
        {isLoading ? 'Loading...' : text}{' '}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
