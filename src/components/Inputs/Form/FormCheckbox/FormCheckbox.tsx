import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IInputProps } from '@/constants/types';
import Checkbox from '@/components/Inputs/Base/Checkbox';

function FormCheckbox(
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
          const { ref, onChange, value, ...restOfField } = field;

          return (
            <Checkbox
              // extra
              {...inputProps}
              onPress={(checked) => onChange(checked)}
              checked={value}
              //
              // computed props
              style={style}
              // placeholder={placeholder}
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

export default FormCheckbox;
