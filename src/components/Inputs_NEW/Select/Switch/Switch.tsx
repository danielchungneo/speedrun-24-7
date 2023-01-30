import React, { forwardRef, Ref } from 'react';
import { ICheckbox } from 'types/components/inputComponents';
import BaseSwitch from './BaseSwitch';
import FormSwitch from './FormSwitch';

function Switch (props: ICheckbox, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormSwitch {...props} />;
  }

  return <BaseSwitch {...props} ref={ref} />;
}

export default forwardRef(Switch);
