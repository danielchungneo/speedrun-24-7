import { ReactNode } from 'react';
import {
  PressableProps,
  ScrollViewProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { CalendarBaseProps } from 'react-native-calendars';
import { ITextProps } from 'types/components';
import { IFontSizeVariant } from './common';

export interface ILabel {
  children: React.ReactNode;
  className?: string;
  variant?: IFontSizeVariant;

  [key: string]: any;
}

export interface IAccordion {
  /**
   * optional title string or component
   */
  title?: string | ReactNode;

  /**
   * optional style for the accordion container
   */
  style?: ViewStyle;

  /**
   * array of accordion items
   */
  items: any[];

  /**
   * optional key extractor for rendering
   */
  keyExtractor?: (item: any, index: number) => string;

  /**
   * rendering function for accordion header/title
   * @description the wrapper is setup to render a full width flex row with a space-between layout.  Return an array of children to have them spaced out across the title area
   */
  renderTitle?: (item: any, index: number) => React.ReactNode;

  /**
   * rendering function for accordion line items
   */
  renderItem: (item: any, index: number) => React.ReactNode;

  appendTitle?: string;
  appendDisabled?: boolean;
  onAppend: () => void;
}

export interface ICalendar extends CalendarBaseProps {
  dates?: any[];
  calendar?: { start: number; end: number };
  onClose?: (calendar?: { start?: number; end?: number }) => void;
}

export interface IScrollTabBar {
  tabs: {
    title: string;
    ui: any;
  }[];
  onChange: (index: number) => void;
  initialPageIndex?: number;
  minTabWidth?: number;
  tabContainerStyle?: ViewProps['style'];
  tabScrollViewStyle?: ScrollViewProps['style'];
  tabScrollViewContentContainerStyle?: ViewProps['style'];
  tabStyle?: PressableProps['style'];
  tabTextStyle?: ITextProps['style'];
  contentContainerStyle?: ViewProps['style'];

  /**
   * sets height in case a static height is needed
   */
  height?: number;

  /**
   * shrinks the tab indicator horizontally
   */
  tabIndicatorPadding?: number;
}
