import React from 'react';
import Text from '../Text';
import Button from './Button';

const CancelButton = ({ disabled, onPress }: any) => {
  return (
    <Button black flex={1} disabled={disabled} onPress={onPress}>
      <Text bold white>
        Cancel
      </Text>
    </Button>
  );
};

export default CancelButton;
