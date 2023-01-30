import React, { useEffect, useMemo, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import {
  View,
  Pressable,
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Text from './Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { IScrollTabBar } from 'types/components/displayComponents';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const MIN_TAB_WIDTH = 100;

const ScrollTabBar = ({
  tabs,
  onChange,
  initialPageIndex = 0,
  minTabWidth = MIN_TAB_WIDTH,
  tabContainerStyle,
  tabScrollViewStyle,
  tabScrollViewContentContainerStyle,
  tabStyle,
  tabTextStyle,
  contentContainerStyle,
  tabIndicatorPadding = 0,
  height,
}: IScrollTabBar) => {
  /**
   * STATE
   */
  const [selectedTabIndex, setSelectedTabIndex] = useState(initialPageIndex);
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const [tabsReady, setTabsReady] = useState<boolean>(false);

  /**
   * HOOKS
   */
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const pagerRef = useRef<PagerView>();
  const scrollTabsRef = useRef<ScrollView>();
  const scrollTabsLayoutsRef = useRef<LayoutRectangle[]>([]);
  const scrollPositionRef = useRef({ x: 0 });

  /**
   * COMPUTED
   */

  //

  /**
   * ANIMATED VALUES
   */
  const tabIndicatorStyle = useAnimatedStyle(() => {
    const currentTab = scrollTabsLayoutsRef.current[selectedTabIndex];
    const toSlideValue = (currentTab?.x || 0) + tabIndicatorPadding;
    const toSlideWidth = (currentTab?.width || 0) - tabIndicatorPadding * 2;

    return {
      position: 'absolute',
      bottom: 4,
      height: 4,
      borderRadius: 4,
      backgroundColor: colors.primary,
      width: withTiming(toSlideWidth, {
        duration: 150,
      }),

      transform: [
        {
          translateX: withTiming(toSlideValue, {
            duration: 150,
          }),
        },
      ],
    };
  }, [tabsReady, selectedTabIndex, minTabWidth]);

  /**
   * FUNCTIONS
   */
  const handleTabsLayout = (evt: any) => {
    setTabBarWidth(evt.nativeEvent.layout.width);
  };

  const handleChangeTab = (tabIndex: number, setPage: boolean = false) => {
    setSelectedTabIndex(tabIndex);

    if (setPage) {
      pagerRef.current?.setPage(tabIndex);
    }

    const layout = scrollTabsLayoutsRef.current[tabIndex];
    const windowWidth = Dimensions.get('window').width;
    const scrollX = scrollPositionRef.current.x;

    const isOffLeftSideOfScreen = layout.x < scrollX;
    const isOffRightSideOfScreen =
      layout.x + layout.width > scrollX + windowWidth;

    if (isOffLeftSideOfScreen) {
      scrollTabsRef.current?.scrollTo({
        x: layout.x,
        y: 0,
        animated: true,
      });
    } else if (isOffRightSideOfScreen) {
      scrollTabsRef.current?.scrollTo({
        x: layout.x + layout.width - windowWidth,
        y: 0,
        animated: true,
      });
    }

    onChange?.(tabIndex);
  };

  /**
   * EFFECTS
   */

  //

  return (
    <>
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#F8F8F8',
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
            zIndex: 1,
            height,
          },
          tabContainerStyle,
        ]}
      >
        <ScrollView
          style={[
            {
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
            },
            tabScrollViewStyle,
          ]}
          contentContainerStyle={[
            {
              minWidth: '100%',
            },
            tabScrollViewContentContainerStyle,
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onLayout={handleTabsLayout}
          onScroll={e => {
            scrollPositionRef.current.x = e.nativeEvent.contentOffset.x;
          }}
          scrollEventThrottle={16}
          ref={scrollTabsRef}
        >
          {tabs.map(({ title }, tabIndex) => {
            const isActive = tabIndex === selectedTabIndex;
            const isLast = tabIndex === tabs.length - 1;
            const key = `tab_${title}_${tabIndex}`;

            return (
              <Pressable
                key={key}
                style={[
                  {
                    flex: 1,
                    minWidth: minTabWidth,
                    paddingTop: 16,
                    paddingBottom: 20,
                    paddingHorizontal: 16,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  tabStyle,
                ]}
                onPress={() => handleChangeTab(tabIndex, true)}
                onLayout={(evt: LayoutChangeEvent) => {
                  const { layout } = evt.nativeEvent;
                  scrollTabsLayoutsRef.current[tabIndex] = layout;

                  isLast && setTabsReady(true);
                }}
              >
                {typeof title === 'function' ? (
                  title()
                ) : (
                  <Text style={tabTextStyle}>{title}</Text>
                )}
              </Pressable>
            );
          })}
          <Animated.View style={[tabIndicatorStyle]} />
        </ScrollView>
      </View>

      <PagerView
        onPageSelected={e => handleChangeTab(e.nativeEvent.position)}
        initialPage={0}
        ref={pagerRef}
        style={[
          {
            flex: 1,
            height: '100%',
          },
          contentContainerStyle,
        ]}
      >
        {tabs.map(tab =>
          React.cloneElement(tab.ui, {
            key: tab.title,
          })
        )}
      </PagerView>
    </>
  );
};

export default ScrollTabBar;
