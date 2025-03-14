import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

const useWarmUpBrowser = () => {
  React.useEffect(() => {
    if (Platform.OS !== 'android') return;
    void WebBrowser.warmUpAsync();
    return () => {
      if (Platform.OS !== 'android') return;
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default useWarmUpBrowser;
