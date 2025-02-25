import React from 'react';
import { ScrollView, Animated } from 'react-native';

const ScrollEvent = ({ children, style, ...rest }: any) => {
  const animatedValue = new Animated.Value(0);
  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
        { useNativeDriver: false },
      )}
      style={style}
      {...rest}>
      {children}
    </ScrollView>
  );
};

export default ScrollEvent;
