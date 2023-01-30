import { TextStyle, ViewStyle } from 'react-native';
import { MaskArray } from 'react-native-mask-input';
import { DateTimePickerProps } from 'react-native-modal-datetime-picker';
import { NumericFormatProps, PatternFormatProps } from 'react-number-format';
import { IAction } from '../api';
import {
  IColorVariant,
  IComponentSize,
  IEntityId,
  IRequest,
  IThemeableComponent,
} from './common';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IComponentSize;
  variant?: IColorVariant;

  /**
   * Button label
   */
  label?: any;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * optional loading state
   */
  loading?: boolean;
}

export interface IDeleteButton extends Omit<IButton, 'id'> {
  id: IEntityId;

  icon?: React.ReactNode;
  request: IRequest;
  onSuccess?: (response: any) => void;
  onError?: (response: any) => void;

  /**
   * used for the parent component to be aware if the confirmation UI is shown
   */
  onShowConfrmDelete?: (show: boolean) => void;
}

export interface IOptions {
  /**
   * available options
   */
  options: any[];

  /**
   * value field to use in the option object
   */
  valueField?: string;

  /**
   * label field to use in the option object
   */
  labelField?: string;
}

export interface IInput
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id?: string;
  size?: IComponentSize;
  variant?: IColorVariant;

  /**
   * label to be shown on the input
   */
  label?: any;

  /**
   * controls the loading state
   */
  loading?: boolean;

  /**
   * show error message
   */
  error?: any;

  /**
   * classes for component label
   */
  labelStyle?: TextStyle | ViewStyle;

  /**
   * classes for component wrapper
   */
  containerStyle?: TextStyle | ViewStyle;

  /**
   * classes for input container element
   */
  inputContainerStyle?: TextStyle | ViewStyle;

  /**
   * classes for input controls container element (parent to input container and decorators)
   */
  inputControlsContainerStyle?: TextStyle | ViewStyle;

  /**
   * use react-hook-form registration instead of self managed state
   */
  form?: boolean;
}

export interface IDecorators {
  /**
   * content to prepend
   */
  prepend?: any | any[];
  /**
   * content to append
   */
  append?: any | any[];
}

export interface ITextField extends IInput, IDecorators {
  /**
   * icon component to render on the right side of the input
   */
  icon?: any;
}

export interface INumberField
  extends Omit<ITextField, 'prefix'>,
    Omit<NumericFormatProps, 'value' | 'defaultValue' | 'size' | 'type'> {
  /**
   * value option to return from onChange
   */
  returnValue?: 'value' | 'floatValue' | 'formattedValue';

  /**
   * prefix to add to the input field (we recommand using mc-kit)
   */
  prefix?: MaskArray | undefined;
}

export interface IPatternField
  extends ITextField,
    Omit<PatternFormatProps, 'value' | 'defaultValue' | 'size' | 'type'> {
  /**
   * pattern to validate against
   */
  format: string;

  /**
   * character to use as a placeholder
   */
  mask?: string;

  /**
   * value option to return from onChange
   */
  returnValue?: 'value' | 'floatValue' | 'formattedValue';
}

export interface ISelectBox extends IInput, IDecorators, IOptions {
  /**
   * form to allow entity creation
   */
  createOptionForm?: any;

  /**
   * callback to run when option creation is complete
   */
  onCreateComplete?: any;

  /**
   * whether the user can clear the selection
   */
  clearable?: boolean;

  /**
   * auto sort the options based on the label field
   */
  autoSort?: boolean;
}

export interface IComboBox extends ISelectBox {
  //
}

export interface IRadioGroup extends IInput, IOptions {
  /**
   * secondary label
   */
  subLabel?: any;

  /**
   * class to append to secondary label
   */
  subLabelClassName?: any;
}

export interface ICheckbox extends Omit<IInput, 'value'> {
  /**
   * value of the checkbox (used in place of `checked`)
   */
  value?: boolean;

  /**
   * secondary label
   */
  subLabel?: any;

  /**
   * class to append to secondary label
   */
  subLabelClassName?: any;

  /**
   * move the label to different sides of the checkbox
   */
  labelPosition?: 'left' | 'right';
}

export interface IDateTimePicker
  extends DateTimePickerProps,
    IInput,
    IDecorators {
  /**
   * show date picker
   */
  showDate?: boolean;
  /**
   * show time picker
   */
  showTime?: boolean;

  value: Date | string;
  onChange(date: string | Date): void;
  onConfirm?: DateTimePickerProps['onConfirm']; // make these optional
  onCancel?: DateTimePickerProps['onCancel'];
  returnType?: 'date' | 'string';
}

export interface IPhotoPicker extends IInput {
  //
}

export interface IEntitySelectBox extends Omit<ISelectBox, 'options'> {
  request: IAction;
  options?: any[];
}

export interface IEntityComboBox extends Omit<IComboBox, 'options'> {
  request: IAction;
  options?: any[];
}
