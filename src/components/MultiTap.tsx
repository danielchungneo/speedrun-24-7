import React, { useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';

const DEFAULT_DELAY_TIME = 400;

const MultiTap = ({
  children,
  style,
  delay,
  onSingleTap,
  onDoubleTap,
  ...props
}: any) => {
  const tapRef = useRef({
    isFirstPress: true,
    lastPressTime: new Date().getTime(),
    delayTime: delay || DEFAULT_DELAY_TIME,
    timer: null,
  });

  const onTap = () => {
    // get the instance of time when pressed
    let now = new Date().getTime();

    if (tapRef.current.isFirstPress) {
      // set the flag indicating first press has occured
      tapRef.current.isFirstPress = false;

      //start a timer --> if a second tap doesnt come in by the delay, trigger singleTap event handler
      tapRef.current.timer = setTimeout(() => {
        //check if user passed in prop
        onSingleTap?.();

        // reset back to initial state
        tapRef.current.isFirstPress = true;
        tapRef.current.timer = null;
      }, tapRef.current.delayTime);

      // mark the last time of the press
      tapRef.current.lastPressTime = now;
    } else {
      //if user pressed immediately again within span of delayTime
      if (now - tapRef.current.lastPressTime < tapRef.current.delayTime) {
        // clear the timeout for the single press
        tapRef.current.timer && clearTimeout(tapRef.current.timer);

        //check if user passed in prop for double click
        onDoubleTap?.();

        // reset back to initial state
        tapRef.current.isFirstPress = true;
      }
    }
  };

  useEffect(() => {
    return () => {
      tapRef.current.timer && clearTimeout(tapRef.current.timer);
    };
  });

  return (
    <TouchableOpacity
      style={style}
      onPress={onTap}
      activeOpacity={1}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default MultiTap;
