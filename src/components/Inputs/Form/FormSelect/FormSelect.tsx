import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IInputProps } from '@/constants/types';
import Select from '../../Base/Select';

function FormSelect(
  props: IInputProps & { name: string; error: string | boolean }
) {
  const { name, placeholder, error, style, ...inputProps } = props;
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }: any) => {
          const { ref, ...restOfField } = field;

          return (
            <Select
              // extra
              {...inputProps}
              //
              // computed
              style={style}
              //
              // RHF
              {...restOfField}
            />
          );
        }}
      />
    </>
  );
}

export default FormSelect;
