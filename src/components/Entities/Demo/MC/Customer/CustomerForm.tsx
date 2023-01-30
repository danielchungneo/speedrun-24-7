import React from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import api from '@/utils/api';
import useRequest from '@/utils/hooks/useRequest';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import Block from '@/components/Block';
import Toast from 'react-native-toast-message';
import Errors from '@/components/Errors';
import ActionBar from '@/components/Buttons/ActionBar';
import CancelButton from '@/components/Buttons/CancelButton';
import SaveButton from '@/components/Buttons/SaveButton';
import { useRef } from 'react';
import DeleteButton from '@/components/Buttons/DeleteButton';
import useSession from '@/utils/hooks/context/useSession';
import TextField from '@/components/Inputs_NEW/Text/TextField';
import Switch from '@/components/Inputs_NEW/Select/Switch';

// Field definitions
export const CUSTOMER_FORM_FIELDS = {
  NAME: 'name',
  DESCRIPTION: 'description',
  FAIL_REQUEST: 'failRequest',
};

// Form Validation
const formValidationSchema = Yup.object({
  [CUSTOMER_FORM_FIELDS.NAME]: Yup.string().required(),
  [CUSTOMER_FORM_FIELDS.DESCRIPTION]: Yup.string().nullable(),
  [CUSTOMER_FORM_FIELDS.FAIL_REQUEST]: Yup.boolean().default(false),
});

// Prop Typescript
type CustomerFormProps = {
  activeObject?: any;
  defaultValues?: any;
  id: string | string[];
  loading?: boolean;
  onCancel?: () => void;
  onCloseForm: (refetch?: boolean) => void;
  onSuccess?: (values: any) => void;
  title: string;
};

function CustomerForm ({
  activeObject: customer,
  defaultValues: defaultValuesProp,
  id,
  loading = false,
  onCloseForm,
  onCancel: onCancelProp,
  onSuccess: onSuccessProp,
  title,
}: CustomerFormProps) {
  const navigation = useNavigation();
  const { styles, assets, colors, fonts, gradients, sizes } = useTheme();
  const {
    state: { navigationType },
  } = useSession();
  const defaultValues = defaultValuesProp || {};

  /**
   * COMPUTED
   */
  const isUsingTabs = navigationType === 'tabs';

  /**
   * REFS
   */
  const scrollRef = useRef();

  // API Calls
  const {
    data: saveData,
    loading: saving,
    errors: savingErrors,
    submitRequest: saveCustomer,
  } = useRequest(api.entities.customers.save({ path: { id } }), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: customer || defaultValues,
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

  function onCancel () {
    if (onCancelProp) {
      onCancelProp();
    } else {
      onCloseForm(false);
    }
  }

  function onError (response: any) {
    Toast.show({
      type: 'error',
      text1: 'Failed to save changes.',
    });
  }

  function onSubmit (values: any) {
    if (values.failRequest) {
      values.id = 'fail';
    }

    saveCustomer?.(values);
  }

  function onSuccess (response: any) {
    if (onSuccessProp) {
      onSuccessProp(response);
    } else {
      onCloseForm?.(true);
    }

    Toast.show({
      type: 'success',
      text1: 'Changes saved.',
    });
  }

  function onDeleteError (response: any) {
    Toast.show({
      type: 'error',
      text1: 'Failed to remove customer.',
    });
  }

  function onDeleteSuccess (response: any) {
    onCloseForm?.(true);

    Toast.show({
      type: 'success',
      text1: 'Customer removed.',
    });
  }

  return (
    <FormProvider {...formMethods}>
      <Block>
        <Block>
          <Block
            keyboard
            ref={scrollRef}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              {
                paddingBottom: sizes.xl,
              },
            ]}
          >
            <Block marginVertical={sizes.m}>
              <TextField
                //
                label='Name'
                name={CUSTOMER_FORM_FIELDS.NAME}
              />

              <TextField
                //
                label='Description'
                name={CUSTOMER_FORM_FIELDS.DESCRIPTION}
                marginTop={sizes.m}
              />

              <Switch
                label='DEV: fail request?'
                name={CUSTOMER_FORM_FIELDS.FAIL_REQUEST}
                style={{
                  marginTop: sizes.m,
                }}
              />

              {false &&
                [...new Array(10)].map((_, index) => (
                  <TextField
                    key={`mock_input${index}`}
                    type='text'
                    label='Description'
                    name={CUSTOMER_FORM_FIELDS.DESCRIPTION}
                    marginTop={sizes.m}
                  />
                ))}
            </Block>

            <Errors errors={savingErrors} />
          </Block>
        </Block>
      </Block>

      <ActionBar useBottomInset={!isUsingTabs}>
        <CancelButton disabled={loading || saving} onPress={onCancel} />

        {id !== 'create' && (
          <DeleteButton
            id={id}
            disabled={loading || saving}
            request={id => api.entities.customers.delete({ path: { id } })}
            onSuccess={onDeleteSuccess}
            onError={onDeleteError}
          />
        )}

        <SaveButton
          saving={saving}
          disabled={loading || saving}
          onPress={handleSubmit(onSubmit)}
        />
      </ActionBar>

      {/* </Form> */}
    </FormProvider>
  );
}

export default CustomerForm;
