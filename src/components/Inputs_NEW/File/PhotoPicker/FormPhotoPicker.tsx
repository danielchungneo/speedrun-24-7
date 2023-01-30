import useFormInput from '@/utils/hooks/useFormInput';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IPhotoPicker } from 'types/components/inputComponents';
import BasePhotoPicker from './BasePhotoPicker';

function FormPhotoPicker (props: IPhotoPicker) {
  /**
   * DO RHF STUFF HERE:
   *
   * * register the input
   * * add custom onChange or parsers/formatters for incoming/outdoing data
   * * etc
   */

  const { name } = props;

  const formContext = useFormContext();
  const { registration, error } = useFormInput(props);

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => {
        return (
          <BasePhotoPicker
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

export default FormPhotoPicker;
