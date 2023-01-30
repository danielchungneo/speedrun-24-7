import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Block from '@/components/Block';
import ScrollTabBar from '@/components/ScrollTabBar';
import UiTestingButtons from './components/display/UiTestingButtons';
import UiTestingText from './components/display/UiTestingText';
import UiTestingBlocks from './components/display/UiTestingBlocks';
import useTheme from '@/utils/hooks/context/useTheme';
import UiTestingInputs from './components/UiTestingInputs';
import UiTestingAccordions from './components/display/UiTestingAccordions';
import UiTestingControlledForms from './components/display/UiTestingControlledForms';
import UiTestingRHFForms from './components/display/UiTestingRHFForms';

const UiTestingHomeScreen = () => {
  // #region STATE
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  // #endregion

  // #region HOOKS
  const { sizes } = useTheme();
  // #endregion

  const pageTabs = [
    {
      title: 'Blocks',
      component: <UiTestingBlocks />,
    },
    {
      title: 'Buttons',
      component: <UiTestingButtons />,
    },
    {
      title: 'Text',
      component: <UiTestingText />,
    },
    {
      title: 'Inputs',
      component: <UiTestingInputs />,
    },
    {
      title: 'Accordions',
      component: <UiTestingAccordions />,
    },
    {
      title: 'Controlled Forms',
      component: <UiTestingControlledForms />,
    },
    {
      title: 'RHF Forms',
      component: <UiTestingRHFForms />,
    },
  ].map(({ title, component }, index) => {
    return {
      title,
      ui: (
        <Block
          // scroll
          bounces={false}
          keyboard
          extraHeight={60}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 12,
            minHeight: '100%',
          }}
        >
          {component}
        </Block>
      ),
    };
  });

  return (
    <>
      <StatusBar style='light' />
      <Block safe>
        <ScrollTabBar
          onChange={setActivePageIndex}
          minTabWidth={50}
          tabIndicatorPadding={sizes.sm}
          tabs={pageTabs}
          height={60}
        />
      </Block>
    </>
  );
};

export default UiTestingHomeScreen;
