import useFormInput from '@/utils/hooks/useFormInput';
import { Controller, useFormContext } from 'react-hook-form';
import { ITextField } from 'types/components/inputComponents';
import BaseTextField from './BaseTextField';

function FormTextField (props: ITextField) {
  /**
   * DO RHF STUFF HERE:
   *
   * * register the input
   * * add custom onChange or parsers/formatters for incoming/outdoing data
   * * etc
   */

  const { name, onChange, onBlur } = props;

  const formContext = useFormContext();
  const { registration, error } = useFormInput(props);

  console.log('FormTextField', { props, registration, error });

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => {
        const internalOnBlur = (evt: any) => {
          registration.onBlur(evt);
          onBlur?.(evt);
        };

        const internalOnChange = event => {
          try {
            field.onChange(event);
            onChange?.(event);
          } catch (error) {
            //
          }
        };

        // console.log("FormNumberField", );

        return (
          <BaseTextField
            {...props}
            {...field}
            {...registration}
            error={error}
            onBlur={internalOnBlur}
            onChange={internalOnChange}
          />
        );
      }}
    />
  );
}

export default FormTextField;
