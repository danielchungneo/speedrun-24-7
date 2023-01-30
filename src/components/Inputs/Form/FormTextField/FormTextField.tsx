import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IInputProps } from '@/constants/types';
import TextField from '../../Base/TextField';

function FormTextField(
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
          const { ref, onChange, ...restOfField } = field;

          return (
            <TextField
              // extra
              {...inputProps}
              //
              // computed props
              style={style}
              // placeholder={placeholder}
              //
              // RHF
              {...restOfField}
              onChangeText={(text) => onChange(text)}
            />
          );
        }}
      />
    </>
  );
}

export default FormTextField;
