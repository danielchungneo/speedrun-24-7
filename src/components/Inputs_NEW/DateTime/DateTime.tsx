import React, { forwardRef, Ref } from 'react';
import { IDateTimePicker } from 'types/components/inputComponents';
import BaseDateTime from './BaseDateTime';
import FormDateTime from './FormDateTime';

function TextField (props: IDateTimePicker, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormDateTime {...props} ref={ref} />;
  }

  return <BaseDateTime {...props} ref={ref} />;
}

export default forwardRef(TextField);
