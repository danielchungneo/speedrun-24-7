import React from 'react';
import { ActivityIndicator } from 'react-native';
import Text from '../Text';
import Button from './Button';

const SaveButton = ({ saving, disabled, onPress }: any) => {
  return (
    <Button primary disabled={disabled} onPress={onPress}>
      {saving ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <Text bold white>
          Save
        </Text>
      )}
    </Button>
  );
};

export default SaveButton;
