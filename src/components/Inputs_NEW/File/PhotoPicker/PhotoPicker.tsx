import React, { forwardRef, Ref } from 'react';
import { IPhotoPicker } from 'types/components/inputComponents';
import BasePhotoPicker from './BasePhotoPicker';
import FormPhotoPicker from './FormPhotoPicker';

function PhotoPicker (props: IPhotoPicker, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormPhotoPicker {...props} />;
  }

  return <BasePhotoPicker {...props} ref={ref} />;
}

export default forwardRef(PhotoPicker);
