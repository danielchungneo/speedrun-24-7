import {
  ITheme,
  ThemeColors,
  ThemeGradients,
  ThemeSizes,
  ThemeSpacing,
} from '../../../types';

import { THEME as commonTheme } from './common';

const COLORS: ThemeColors = {
  // default text color
  text: '#FFFFFF',

  // base colors
  /** UI color for #primary */
  primary: '#0d6efd',
  /** UI color for #secondary */
  secondary: '#8392AB',
  /** UI color for #tertiary */
  tertiary: '#E8AE4C',

  // non-colors
  black: '#252F40',
  white: '#FFFFFF',

  dark: '#252F40',
  light: '#E9ECEF',

  // gray variations
  /** UI color for #gray */
  neutral: '#8392AB', // '#A7A8AE'
  gray: '#e4e6eb', // '#A7A8AE'

  // colors variations
  /** UI color for #danger */
  danger: '#EA0606',
  /** UI color for #warning */
  warning: '#FFC107',
  /** UI color for #success */
  success: '#82D616',
  /** UI color for #info */
  info: '#17C1E8',

  /** UI colors for navigation & card */
  card: '#292C3A',
  background: '#1B1D22',

  /** UI color for shadowColor */
  shadow: '#fff', // originally #627594
  overlay: 'rgba(0,0,0,0.3)',

  /** UI color for input borderColor on focus */
  focus: '#CB0C9F',
  input: '#FFFFFF',

  /** UI color for switch checked/active color */
  switchOn: '#CB0C9F',
  switchOff: '#181A1F',

  /** UI color for checkbox icon checked/active color */
  checkbox: ['#3A416F', '#141727'],
  checkboxIcon: '#FFFFFF',

  /** social colors */
  facebook: '#3B5998',
  twitter: '#55ACEE',
  dribbble: '#EA4C89',

  /** icon tint color */
  icon: '#FFFFFF',

  /** blur tint color */
  blurTint: 'dark',

  /** product link color */
  link: '#FFFFFF',
};

const GRADIENTS: ThemeGradients = {
  primary: ['#FF0080', '#7928CA'],
  secondary: ['#A8B8D8', '#627594'],
  info: ['#21D4FD', '#2152FF'],
  success: ['#98EC2D', '#17AD37'],
  warning: ['#FBCF33', '#F53939'],
  danger: ['#FF667C', '#EA0606'],

  light: ['#EBEFF4', '#CED4DA'],
  dark: ['#3A416F', '#141727'],

  white: [String(COLORS.white), '#EBEFF4'],
  black: [String(COLORS.black), '#141727'],

  divider: ['rgba(255,255,255,0)', 'rgba(102, 116, 142, 0.6)'],
  menu: [
    'rgba(255, 255, 255, 0.0)',
    'rgba(255, 255, 255, 0.5)',
    'rgba(255, 255, 255, 0.0)',
  ],
};

const SIZES_OVERRIDES: Partial<ThemeSizes> = {
  shadowRadius: 8, // originally 4
};

const SPACING_OVERRIDES: Partial<ThemeSpacing> = {
  //
};

export const DARK_THEME: ITheme = {
  ...commonTheme,
  colors: COLORS,
  gradients: GRADIENTS,
  sizes: { ...commonTheme.sizes, ...SPACING_OVERRIDES, ...SIZES_OVERRIDES },
};
