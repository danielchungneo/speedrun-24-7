import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Modal as RNModal,
  ViewStyle,
  Platform,
  Pressable,
  Animated,
} from 'react-native';
import useTheme from '@/utils/hooks/context/useTheme';
import { IModalProps } from '@/constants/types';
import Block from './Block';
import Button from './Buttons/Button';
import { BlurView } from 'expo-blur';
import { Portal } from '@gorhom/portal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from '@/constants/platform';
import { View } from 'react-native';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

const ENTRY_ANIMATION_DURATION = 200;
const EXIT_ANIMATION_DURATION = 150;

const Modal = ({
  id = 'Modal',
  children,
  style,
  onClose,
  headerContent,
  hideCloseButton = false,
  backdropColor,
  backdropBlur,
  viewMode = 'dialog',
  animationType,
  contentColor,
  visible,
  allowBackdropPress,
  onBackdropPress,
  ...props
}: IModalProps) => {
  /**
   * HOOKS
   */
  const { assets, colors, sizes, styles } = useTheme();
  const insets = useSafeAreaInsets();
  const animatedViewRef = useRef();

  /**
   * STATE
   */
  const [modalVisible, setModalVisible] = useState(visible);
  const [animatedViewLayout, setAnimatedViewLayout] = useState<{
    height: number;
    width: number;
    x: number;
    y: number;
  }>({ height: 0, width: 0, x: 0, y: 0 });

  /**
   * REFS
   */
  const slideAnimationYValue = useRef(new Animated.Value(0)).current;
  const fadeAnimationValue = useRef(new Animated.Value(0)).current;

  /**
   * COMPUTED
   */
  const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const modalID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  const showAsDialog = viewMode === 'dialog';
  const modalAnimationType = animationType || (showAsDialog ? 'fade' : 'slide');
  const useSlideAnimation = modalAnimationType === 'slide';
  const useFadeAnimation = modalAnimationType === 'fade';
  const useNoAnimation = modalAnimationType === 'none';

  const modalBackdropColor =
    backdropColor || showAsDialog
      ? String(colors.black) + (isAndroid ? 'F0' : '70')
      : isAndroid
      ? String(colors.black) + 'D0'
      : 'transparent';
  const modalBackdropBlur =
    backdropBlur !== undefined ? backdropBlur : showAsDialog ? 25 : 15;
  const finalContentColor = contentColor || colors.white;

  const BlurViewComponent = isAndroid ? View : BlurView;

  /**
   * FUNCTIONS
   */
  const runSlideInAnimation = () => {
    const toSlideValue = showAsDialog
      ? -sizes.height / 2 + animatedViewLayout.height / 2 // center vertically on screen
      : 0; // keep on bottom of screen

    // if slide animation, animate to slide value, otherwise jump there immediately
    Animated.timing(slideAnimationYValue, {
      toValue: toSlideValue,
      duration: useSlideAnimation ? ENTRY_ANIMATION_DURATION : 0,
      useNativeDriver: true,
    }).start();
  };

  const runSlideOutAnimation = () => {
    const toSlideValue = animatedViewLayout.height; // put just outside of screen

    Animated.timing(slideAnimationYValue, {
      toValue: toSlideValue,
      duration: useSlideAnimation ? EXIT_ANIMATION_DURATION : 0,
      useNativeDriver: true,
    }).start();
  };

  const runFadeInAnimation = () => {
    // if fade animation, animate to 1, otherwise jump there immediately
    Animated.timing(fadeAnimationValue, {
      toValue: 1,
      duration: useFadeAnimation ? ENTRY_ANIMATION_DURATION : 0,
      useNativeDriver: true,
    }).start();
  };

  const runFadeOutAnimation = () => {
    Animated.timing(fadeAnimationValue, {
      toValue: 0,
      duration: useFadeAnimation ? EXIT_ANIMATION_DURATION : 0,
      useNativeDriver: true,
    }).start();
  };

  const handleOpenModal = useCallback(() => {
    runSlideInAnimation();
    runFadeInAnimation();
  }, [
    slideAnimationYValue,
    fadeAnimationValue,
    animatedViewLayout,
    showAsDialog,
  ]);

  const handleCloseModal = useCallback(() => {
    if (useSlideAnimation) {
      runSlideOutAnimation();
    } else if (useFadeAnimation) {
      runFadeOutAnimation();
    }

    setTimeout(
      () => {
        // run the oppsoite animation to reset the animation values
        if (useSlideAnimation) {
          runFadeOutAnimation();
        } else if (useFadeAnimation) {
          runSlideOutAnimation();
        }

        setModalVisible(false);
        onClose?.();
      },
      useNoAnimation ? 0 : EXIT_ANIMATION_DURATION
    );
  }, [slideAnimationYValue, fadeAnimationValue, animatedViewLayout, onClose]);

  const handleAnimatedLayout = useCallback((evt) => {
    setAnimatedViewLayout(evt.nativeEvent.layout);
  }, []);

  const handleClickawayPress = useCallback((evt) => {
    if (onBackdropPress) {
      onBackdropPress(evt);
      return;
    }

    if (allowBackdropPress && onClose) {
      handleCloseModal();
    }
  }, []);

  const handleInnerContentPress = useCallback((evt) => {
    //
  }, []);

  /**
   * EFFECTS
   */
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
    } else {
      handleCloseModal();
    }
  }, [visible]);

  useEffect(() => {
    if (animatedViewLayout.height) {
      handleOpenModal();
    }
  }, [animatedViewLayout]);

  return !!modalVisible ? (
    <Portal>
      {/* {!!props.visible && ( */}
      <BlurViewComponent
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          flex: 1,
          display: 'flex',
          justifyContent: showAsDialog ? 'center' : 'flex-end',
          backgroundColor: modalBackdropColor,
          // backgroundColor: 'red',
        }}
        intensity={modalBackdropBlur}
      >
        <Pressable style={{ flex: 1 }} onPress={handleClickawayPress}>
          <Animated.View
            onLayout={handleAnimatedLayout}
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                // backgroundColor: '#FFFFFF',
                // height: 100,
              },
              {
                opacity: fadeAnimationValue,
                transform: [
                  {
                    translateY: slideAnimationYValue,
                  },
                ],
              },
            ]}
          >
            <Block
              style={{
                flex: 1,
                justifyContent: showAsDialog ? 'center' : 'flex-end',
                // backgroundColor: modalBackdropColor,
              }}
            >
              <Block
                flex={0}
                color={finalContentColor}
                marginHorizontal={showAsDialog ? sizes.m : 0}
                style={[
                  {
                    overflow: 'hidden',
                  },

                  showAsDialog
                    ? {
                        borderRadius: sizes.cardRadius,
                      }
                    : {
                        borderTopLeftRadius: sizes.cardRadius,
                        borderTopRightRadius: sizes.cardRadius,
                      },
                ]}
              >
                <Pressable onPress={handleInnerContentPress}>
                  <Block flex={0} row>
                    <Block paddingLeft={sizes.sm}>{headerContent}</Block>

                    <Block flex={0}>
                      {!hideCloseButton && (
                        <Button onPress={handleCloseModal}>
                          <Ionicons
                            name="close"
                            size={sizes.m}
                            color={colors.secondary}
                          />
                        </Button>
                      )}
                    </Block>
                  </Block>

                  <Block
                    //
                    flex={0}
                    paddingHorizontal={sizes.padding}
                    paddingBottom={showAsDialog ? sizes.m : insets.bottom}
                  >
                    {children}
                  </Block>
                </Pressable>
              </Block>
            </Block>
          </Animated.View>
        </Pressable>
      </BlurViewComponent>
      {/* )} */}
    </Portal>
  ) : null;
};

export default React.memo(Modal);
