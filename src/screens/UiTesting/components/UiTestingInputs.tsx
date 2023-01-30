import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Block from '@/components/Block';
import ScrollTabBar from '@/components/ScrollTabBar';
import useTheme from '@/utils/hooks/context/useTheme';
import UiTestingTextField from './inputs/UiTestingTextField';
import UiTestingNumberField from './inputs/UiTestingNumberField';
import UiTestingPatternField from './inputs/UiTestingPatternField';
import UiTestingCheckbox from './inputs/UiTestingCheckbox';
import UiTestingRadio from './inputs/UiTestingRadio';
import UiTestingSelect from './inputs/UiTestingSelect';
import UiTestingDateTime from './inputs/UiTestingDateTime';
import UiTestingPhotoPicker from './inputs/UiTestingPhotoPicker';
import UiTestingSwitch from './inputs/UiTestingSwitch';

const UiTestingInputs = () => {
  // #region STATE
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  // #endregion

  // #region HOOKS
  const { sizes, colors } = useTheme();
  // #endregion

  const pageTabs = [
    {
      title: 'Photo Picker',
      component: <UiTestingPhotoPicker />,
    },
    {
      title: 'TextField',
      component: <UiTestingTextField />,
    },
    {
      title: 'NumberField',
      component: <UiTestingNumberField />,
    },
    {
      title: 'PatternField',
      component: <UiTestingPatternField />,
    },
    {
      title: 'DateTime',
      component: <UiTestingDateTime />,
    },
    {
      title: 'Checkbox',
      component: <UiTestingCheckbox />,
    },
    {
      title: 'Switch',
      component: <UiTestingSwitch />,
    },
    {
      title: 'Radios',
      component: <UiTestingRadio />,
    },
    {
      title: 'Select',
      component: <UiTestingSelect />,
    },
  ].map(({ title, component }, index) => {
    return {
      title,
      ui: (
        <Block
          flex={0}
          scroll
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {component}
        </Block>
      ),
    };
  });

  return (
    <Block width='100%'>
      <ScrollTabBar
        onChange={setActivePageIndex}
        minTabWidth={50}
        tabIndicatorPadding={sizes.sm}
        tabs={pageTabs}
        tabContainerStyle={{
          margin: -12,
          marginBottom: 0,
        }}
      />
    </Block>
  );
};

export default UiTestingInputs;
