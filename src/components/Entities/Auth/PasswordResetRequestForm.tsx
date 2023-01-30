import Block from '@/components/Block';
import Button from '@/components/Buttons/Button';
import GoBackButton from '@/components/Buttons/GoBackButton';
import Errors from '@/components/Errors';
import Image from '@/components/Image';
import FormInput from '@/components/Inputs/Form/FormInput';
import Text from '@/components/Text';
import { isAndroid } from '@/constants/platform';
import api from '@/utils/api';
import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import useRequest from '@/utils/hooks/useRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

// Field definitions
export const PASSWORD_FORM_FIELDS = {
  EMAIL: 'email',
};

// Form Validation
const formValidationSchema = Yup.object({
  [PASSWORD_FORM_FIELDS.EMAIL]: Yup.string().email().required(),
});

// Prop Typescript
type PasswordResetRequestFormPropTypes = {
  revalidateCache?: () => void;
  title: string;
  loading?: boolean;
};

function PasswordResetRequestForm({
  revalidateCache,
  loading = false,
  title,
}: PasswordResetRequestFormPropTypes) {
  const navigation = useNavigation();
  const { sizes, colors, assets, styles } = useTheme();
  const { t } = useTranslation();

  const defaultValues = {
    [PASSWORD_FORM_FIELDS.EMAIL]: 'jason.barnett@morelandconnect.co',
  };

  // State Variables
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState();

  // API Calls
  const {
    data: requestData,
    loading: requesting,
    errors: requestingErrors,
    submitRequest: requestResetPassword,
  } = useRequest(api.auth.users.resetPasswordRequest(), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
    watch,
    setValue,
    getValues,
    control,
  } = formMethods;

  function onCancel() {
    navigation.goBack();
  }

  function onError(response: any) {
    Toast.show({
      type: 'error',
      text1: 'Failed to save changes.',
    });
  }

  function onSubmit(values: any) {
    setEmail(values.email);
    requestResetPassword(values);
  }

  function handleBackToLogin() {
    navigation.goBack();
  }

  function onSuccess(response: any) {
    setEmailSent(true);
    revalidateCache?.();
    Toast.show({
      type: 'success',
      text1: 'Email sent.',
    });
  }

  return (
    <Block flex={0}>
      <Block flex={0} tint={colors.blurTint}>
        <GoBackButton />

        <Block
          flex={0}
          // paddingHorizontal={sizes.sm}
          marginTop={sizes.xl}
        >
          {!emailSent ? (
            <FormProvider {...formMethods}>
              <Block flex={0} marginBottom={sizes.sm}>
                <Text h4>{title}</Text>
                <Text p semibold marginTop={sizes.s}>
                  Don't worry, we'll send you an email with instructions to
                  reset it.
                </Text>
              </Block>
              <Block flex={0} marginVertical={sizes.sm}>
                <FormInput
                  label="Email Address"
                  type="text"
                  name={PASSWORD_FORM_FIELDS.EMAIL}
                  maxLength={255}
                  autocomplete="email"
                />
              </Block>
              <Errors errors={requestingErrors} />

              <Block flex={0} marginTop={sizes.sm}>
                <Button
                  primary
                  disabled={loading || requesting}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text white>
                    {requesting ? 'Sending Email...' : 'Send Email'}
                  </Text>
                </Button>
              </Block>
            </FormProvider>
          ) : (
            <React.Fragment>
              <Block flex={0}>
                <Text h4>Email Sent</Text>
                <Text p semibold marginTop={sizes.s}>
                  Instructions to reset your password have been sent to:{' '}
                </Text>

                <Text p bold marginTop={sizes.sm} marginBottom={sizes.l}>
                  {email}
                </Text>
              </Block>

              <Block flex={0} row>
                <Button primary onPress={handleBackToLogin} width="100%">
                  <Text bold marginLeft={sizes.xs} center white>
                    Back to Login
                  </Text>
                </Button>
              </Block>
            </React.Fragment>
          )}
        </Block>
      </Block>
    </Block>
  );
}

export default PasswordResetRequestForm;
