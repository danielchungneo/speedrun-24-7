import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IInputProps } from '@/constants/types';
import Switch from '@/components/Inputs/Base/Switch';

function FormSwitch(
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
            <Switch
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

export default FormSwitch;
