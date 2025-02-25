import { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useStatusBar = (style: any, color: any, animation?: boolean) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animation);
      StatusBar.setBackgroundColor(color);
    }, [style, color, animation]),
  );
};

export default useStatusBar;
