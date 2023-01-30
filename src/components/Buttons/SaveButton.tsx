import React from 'react';
import { ActivityIndicator } from 'react-native';
import { IButtonProps } from 'types';
import Text from '../Text';
import Button from './Button';

const SaveButton = ({ saving, text, ...buttonProps }: IButtonProps) => {
  return (
    <Button variant='primary' {...buttonProps}>
      {saving ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <Text bold variant='white'>
          {text || "Save"}
        </Text>
      )}
    </Button>
  );
};

export default SaveButton;
