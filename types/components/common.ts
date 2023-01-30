import {
  KeysOf,
  KeysOfOptionalType,
  KeysOfType,
  PickByOptionalType,
  PickByType,
} from 'types/data';
import { ThemeSizes } from 'types/theme';
import { IAction } from '../api';

export type IEntityId = string | string[] | number | number[];
export interface IThemeableComponent {
  /**
   * size of the input/component
   */
  size?: IComponentSize;

  /**
   * color/theme  variant
   */
  variant?: IColorVariant;
}

export type IComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IColorVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'alternative'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'white'
  | 'black'
  | 'light'
  | 'dark'
  | 'neutral';

export type IFontSizeVariant = KeysOf<
  Pick<
    ThemeSizes,
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 's1'
    | 's2'
    | 's3'
    | 's4'
    | 's5'
    | 's6'
    | 'i1'
    | 'i2'
    | 'p'
  >
>;

export type IRequest = (id: IEntityId) => IAction;
