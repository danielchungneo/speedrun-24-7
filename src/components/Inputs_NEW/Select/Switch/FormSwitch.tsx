import useFormInput from '@/utils/hooks/useFormInput';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ICheckbox } from 'types/components/inputComponents';
import BaseSwitch from './BaseSwitch';

function FormSwitch (props: ICheckbox) {
  /**
   * DO RHF STUFF HERE:
   *
   * * register the input
   * * add custom onChange or parsers/formatters for incoming/outdoing data
   * * etc
   */

  const { disabled, ...other } = props;
  const { name } = props;
  const formContext = useFormContext();
  const { registration, error } = useFormInput(other);

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => {
        return (
          <BaseSwitch
            //
            {...props}
            {...field}
            {...registration}
            error={error}
          />
        );
      }}
    />
  );
}

export default FormSwitch;
