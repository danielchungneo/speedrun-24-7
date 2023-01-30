import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DateTimePicker from '@/components/Inputs/Base/DateTimePicker';
import { IInputProps } from '@/constants/types';

/*
  !!! IMPORTANT !!!
  ! THIS COMPONENT WILL BREAK IF YOU USE DATE AND THE DATATYPE IS NOT DATE IN THE DATABASE !
  !!! ON VALIDATION OF FORM THE TYPE MUST BE date() !!!
*/

function FormDate(
  props: IInputProps & { name: string; error: string | boolean }
) {
  const { name, placeholder, error, style, type, ...inputProps } = props;
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }: any) => {
          const { ref, ...restOfField } = field;

          return (
            <DateTimePicker
              // extra
              {...inputProps}
              //
              // computed
              style={style}
              mode={type}
              returnType='date'
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

export default FormDate;
