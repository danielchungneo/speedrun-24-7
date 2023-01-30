import React from 'react';
import Text from '../Text';
import Button from './Button';

const CancelButton = ({ disabled, onPress }: any) => {
  return (
    <Button variant='black' flex={1} disabled={disabled} onPress={onPress}>
      <Text bold variant='white'>
        Cancel
      </Text>
    </Button>
  );
};

export default CancelButton;
