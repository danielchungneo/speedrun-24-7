import useRequest from '@/utils/hooks/useRequest';
import { IAction } from 'types';
import React, { useState } from 'react';
import Button from './Button';
import Text from '../Text';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '../Block';
import Modal from '../Modal';
import { BlurView } from 'expo-blur';
import { ActivityIndicator } from 'react-native';
import { isAndroid } from '@/constants/platform';

type DeleteButtonProps = {
  id: string | string[];
  buttonText?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  request: (id: string | string[]) => IAction;
  onSuccess?: (response: any) => void;
  onError?: (response: any) => void;
  children?: any;
};

function DeleteButton ({
  id,
  buttonText,
  disabled,
  icon,
  onError,
  onSuccess,
  request,
  children,
}: DeleteButtonProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { sizes } = useTheme();

  const {
    data,
    loading: deleting,
    errors,
    submitRequest,
  } = useRequest(request(id), {
    onSuccess: onDeleteSuccess,
    onError: onDeleteError,
  });

  function onClickDelete () {
    setShowConfirmDelete(true);
  }

  function onCancel () {
    setShowConfirmDelete(false);
  }

  function onConfirm () {
    submitRequest?.();
  }

  function onDeleteError (response: any) {
    setShowConfirmDelete(false);
    onError?.(response);
  }

  function onDeleteSuccess (response: any) {
    setShowConfirmDelete(false);
    onSuccess?.(response);
  }

  return (
    <>
      <Button
        flex={0}
        variant='danger'
        disabled={disabled || deleting}
        onPress={onClickDelete}
      >
        <Text bold variant='white'>
          {icon || buttonText || 'Delete'}
        </Text>
      </Button>

      <Modal
        visible={showConfirmDelete}
        // onClose={() => setShowConfirmDelete(false)}
        hideCloseButton
        contentColor={isAndroid ? undefined : 'transparent'}
        backdropColor='rgba(0,0,0,0.5)'
      >
        <Block flex={0} marginTop={sizes.m}>
          <Text variant={isAndroid ? 'black' : 'white'} center size='h4'>
            Confirm deletion
          </Text>

          <Block flex={0} row marginTop={sizes.xl}>
            <Button
              variant='black'
              disabled={disabled || deleting}
              onPress={onCancel}
              flex={1}
            >
              <Text bold variant='white'>
                Cancel
              </Text>
            </Button>
            <Block flex={0} width={sizes.sm} />
            <Button
              variant='danger'
              disabled={disabled || deleting}
              onPress={onConfirm}
              flex={1}
            >
              {deleting ? (
                <ActivityIndicator color='white' size='small' />
              ) : (
                <Text bold variant='white'>
                  Confirm
                </Text>
              )}
            </Button>
          </Block>
        </Block>
      </Modal>
    </>
  );
}

export default DeleteButton;
