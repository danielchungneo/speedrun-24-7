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
import Text from '@/components/Text';
import Divider from '@/components/Divider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextField from '@/components/Inputs_NEW/Text/TextField';
import NumberField from '@/components/Inputs_NEW/Text/NumberField';
import SelectBox from '@/components/Inputs_NEW/Select/SelectBox';
import Checkbox from '@/components/Inputs_NEW/Select/Checkbox';
import Switch from '@/components/Inputs_NEW/Select/Switch';
import DateTime from '@/components/Inputs_NEW/DateTime';

/**
 *
 * FIELD DEFINITIONS
 *
 * ! these are for DEMO only
 * + base names start as empty inputs
 * + `prefilledXXX` names will have prepopulated values to test the Form on load
 * + `disabledXXX` names will be disabled to test the Form on load
 *
 */
export const ENTITY_TEMPLATE_FIELDS = {
  // textfield: text
  NAME: 'name',
  PREFILLED_NAME: 'prefilledName',
  DISABLED_NAME: 'disabledName',

  // textfield: textarea
  DESCRIPTION: 'description',
  PREFILLED_DESCRIPTION: 'prefilledDescription',
  DISABLED_DESCRIPTION: 'disabledDescription',

  // textfield: password
  PASSWORD: 'password',
  PREFILLED_PASSWORD: 'prefilledPassword',
  DISABLED_PASSWORD: 'disabledPassword',

  // textfield: number
  AGE: 'age',
  PREFILLED_AGE: 'prefilledAge',
  DISABLED_AGE: 'disabledAge',

  // textfield: decimal
  PRICE_OF_GAS: 'priceOfGas',
  PREFILLED_PRICE_OF_GAS: 'prefilledPriceOfGas',
  DISABLED_PRICE_OF_GAS: 'disabledPriceOfGas',

  // select
  ROLE_ID: 'roleId',
  PREFILLED_ROLE_ID: 'prefilledRoleId',
  DISABLED_ROLE_ID: 'disabledRoleId',

  // checkbox
  OWNS_DOG: 'ownsDog',
  PREFILLED_OWNS_DOG: 'prefilledOwnsDog',
  DISABLED_OWNS_DOG: 'disabledOwnsDog',
  OWNS_CAT: 'ownsCat',
  PREFILLED_OWNS_CAT: 'prefilledOwnsCat',
  DISABLED_OWNS_CAT: 'disabledOwnsCat',

  // switch
  READY_TO_GOLF: 'readyToGolf',
  PREFILLED_READY_TO_GOLF: 'prefilledReadyToGolf',
  DISABLED_READY_TO_GOLF: 'disabledReadyToGolf',

  // date
  BIRTHDAY: 'birthday',
  PREFILLED_BIRTHDAY: 'prefilledBirthday',
  DISABLED_BIRTHDAY: 'disabledBirthday',

  // time
  ARRIVAL_AT_WORK_TIME: 'arrivalAtWorkTime',
  PREFILLED_ARRIVAL_AT_WORK_TIME: 'prefilledArrivalAtWorkTime',
  DISABLED_ARRIVAL_AT_WORK_TIME: 'disabledArrivalAtWorkTime',

  // datetime
  NEXT_MEETING_DATETIME: 'nextMeetingDatetime',
  PREFILLED_NEXT_MEETING_DATETIME: 'prefilledNextMeetingDatetime',
  DISABLED_NEXT_MEETING_DATETIME: 'disabledNextMeetingDatetime',
};

// Form Validation
const formValidationSchema = Yup.object({
  [ENTITY_TEMPLATE_FIELDS.NAME]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_NAME]: Yup.string(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_NAME]: Yup.string(),
  //
  [ENTITY_TEMPLATE_FIELDS.DESCRIPTION]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_DESCRIPTION]: Yup.string(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_DESCRIPTION]: Yup.string(),
  //
  [ENTITY_TEMPLATE_FIELDS.PASSWORD]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_PASSWORD]: Yup.string(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_PASSWORD]: Yup.string(),
  //
  [ENTITY_TEMPLATE_FIELDS.AGE]: Yup.number().nullable(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_AGE]: Yup.number().nullable(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_AGE]: Yup.number().nullable(),
  //
  [ENTITY_TEMPLATE_FIELDS.PRICE_OF_GAS]: Yup.number().nullable(), //.required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_PRICE_OF_GAS]: Yup.number().nullable(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_PRICE_OF_GAS]: Yup.number().nullable(),
  //
  [ENTITY_TEMPLATE_FIELDS.ROLE_ID]: Yup.number().nullable(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_ROLE_ID]: Yup.number().nullable(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_ROLE_ID]: Yup.number().nullable(),
  //
  [ENTITY_TEMPLATE_FIELDS.OWNS_DOG]: Yup.boolean().default(false).nullable(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_OWNS_DOG]: Yup.boolean().default(false),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_OWNS_DOG]: Yup.boolean().default(false),
  [ENTITY_TEMPLATE_FIELDS.OWNS_CAT]: Yup.boolean().default(false),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_OWNS_CAT]: Yup.boolean().default(false),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_OWNS_CAT]: Yup.boolean().default(false),
  //
  [ENTITY_TEMPLATE_FIELDS.BIRTHDAY]: Yup.date(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_BIRTHDAY]: Yup.date(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_BIRTHDAY]: Yup.date(),
  //
  [ENTITY_TEMPLATE_FIELDS.ARRIVAL_AT_WORK_TIME]: Yup.date(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_ARRIVAL_AT_WORK_TIME]: Yup.date(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_ARRIVAL_AT_WORK_TIME]: Yup.date(),
  //
  [ENTITY_TEMPLATE_FIELDS.NEXT_MEETING_DATETIME]: Yup.date(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_NEXT_MEETING_DATETIME]: Yup.date(),
  [ENTITY_TEMPLATE_FIELDS.DISABLED_NEXT_MEETING_DATETIME]: Yup.date(),
});

const mockServerResponse = {
  [ENTITY_TEMPLATE_FIELDS.NAME]: '',
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_NAME]: 'Jason Bourne',
  [ENTITY_TEMPLATE_FIELDS.DISABLED_NAME]: 'Jason Bourne',
  //
  [ENTITY_TEMPLATE_FIELDS.DESCRIPTION]: '',
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_DESCRIPTION]:
    'A short description about Jason Bourne...',
  [ENTITY_TEMPLATE_FIELDS.DISABLED_DESCRIPTION]:
    'A short description about Jason Bourne...',
  //
  [ENTITY_TEMPLATE_FIELDS.PASSWORD]: '',
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_PASSWORD]: 'Test123!',
  [ENTITY_TEMPLATE_FIELDS.DISABLED_PASSWORD]: 'Test123!',
  //
  [ENTITY_TEMPLATE_FIELDS.AGE]: null,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_AGE]: 30,
  [ENTITY_TEMPLATE_FIELDS.DISABLED_AGE]: 30,
  //
  [ENTITY_TEMPLATE_FIELDS.PRICE_OF_GAS]: null,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_PRICE_OF_GAS]: 3.8,
  [ENTITY_TEMPLATE_FIELDS.DISABLED_PRICE_OF_GAS]: 3.8,
  //
  [ENTITY_TEMPLATE_FIELDS.ROLE_ID]: null,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_ROLE_ID]: 1,
  [ENTITY_TEMPLATE_FIELDS.DISABLED_ROLE_ID]: 1,
  //
  [ENTITY_TEMPLATE_FIELDS.OWNS_DOG]: null,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_OWNS_DOG]: true,
  [ENTITY_TEMPLATE_FIELDS.DISABLED_OWNS_DOG]: true,
  [ENTITY_TEMPLATE_FIELDS.OWNS_CAT]: undefined,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_OWNS_CAT]: undefined,
  [ENTITY_TEMPLATE_FIELDS.DISABLED_OWNS_CAT]: undefined,

  [ENTITY_TEMPLATE_FIELDS.READY_TO_GOLF]: null,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_READY_TO_GOLF]: true,
  [ENTITY_TEMPLATE_FIELDS.DISABLED_READY_TO_GOLF]: true,
  //
  [ENTITY_TEMPLATE_FIELDS.BIRTHDAY]: null,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_BIRTHDAY]: '2022-04-12T19:46:18.52',
  [ENTITY_TEMPLATE_FIELDS.DISABLED_BIRTHDAY]: '2022-04-12T19:46:18.52',
  // //
  [ENTITY_TEMPLATE_FIELDS.ARRIVAL_AT_WORK_TIME]: null,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_ARRIVAL_AT_WORK_TIME]:
    '2022-04-12T19:46:18.52',
  [ENTITY_TEMPLATE_FIELDS.DISABLED_ARRIVAL_AT_WORK_TIME]:
    '2022-04-12T19:46:18.52',
  // //
  [ENTITY_TEMPLATE_FIELDS.NEXT_MEETING_DATETIME]: null,
  [ENTITY_TEMPLATE_FIELDS.PREFILLED_NEXT_MEETING_DATETIME]:
    '2022-04-12T19:46:18.52',
  [ENTITY_TEMPLATE_FIELDS.DISABLED_NEXT_MEETING_DATETIME]:
    '2022-04-12T19:46:18.52',
};

const ROLE_OPTIONS = [
  {
    label: 'Admin',
    value: 1,
  },
  {
    label: 'Developer',
    value: 2,
  },
  {
    label: 'Viewer',
    value: 3,
  },
];

// Prop Typescript
type EntityTemplateFormProps = {
  activeObject?: any;
  defaultValues?: any;
  id: string | string[];
  loading?: boolean;
  onCancel?: () => void;
  onCloseForm: (refetch?: boolean) => void;
  onSuccess?: (values: any) => void;
  title: string;
};

function EntityTemplateForm ({
  activeObject: entity,
  defaultValues: defaultValuesProp,
  id,
  loading = false,
  onCloseForm,
  onCancel: onCancelProp,
  onSuccess: onSuccessProp,
  title,
}: EntityTemplateFormProps) {
  /**
   * HOOKS
   */
  const navigation = useNavigation();
  const { styles, assets, colors, fonts, gradients, sizes } = useTheme();
  const insets = useSafeAreaInsets();

  /**
   * COMPUTED
   */
  const defaultValues = defaultValuesProp || {};

  /**
   * REFS
   */
  const scrollRef = useRef();

  // API Calls
  const {
    data: savedData,
    loading: saving,
    errors: savingErrors,
    submitRequest: saveEntity,
  } = useRequest(api.entities.customers.save({ path: { id } }), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: mockServerResponse || entity || defaultValues,
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

    console.log('onSubmit', values);

    // saveEntity?.(values);
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
      text1: 'Failed to remove entity.',
    });
  }

  function onDeleteSuccess (response: any) {
    onCloseForm?.(true);

    Toast.show({
      type: 'success',
      text1: 'Entity removed.',
    });
  }

  return (
    <FormProvider {...formMethods}>
      <Block
        keyboard
        ref={scrollRef}
        extraScrollHeight={insets.bottom}
        // bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingBottom: insets.bottom + 50,
          },
        ]}
      >
        <Block flex={0}>
          <Text size='h5' bold variant='warning' marginTop={sizes.sm} center>
            Warning: this screen will not actually create, update, or delete an
            entity. It is for demo purposes only.
          </Text>

          <Block flex={0} marginVertical={sizes.m}>
            <Text size='p' bold variant='danger'>
              Text
            </Text>

            <TextField
              //
              label='Name'
              name={ENTITY_TEMPLATE_FIELDS.NAME}
            />
            <TextField
              label='Prefilled Name'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_NAME}
              marginTop={sizes.sm}
            />
            <TextField
              label='Disabled Name'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_NAME}
              marginTop={sizes.sm}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              Textarea
            </Text>

            <TextField
              type='textarea'
              label='Desciption'
              name={ENTITY_TEMPLATE_FIELDS.DESCRIPTION}
            />
            <TextField
              type='textarea'
              numberOfLines={5}
              label='Prefilled Description'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_DESCRIPTION}
              marginTop={sizes.sm}
            />
            <TextField
              type='textarea'
              label='Disabled Description'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_DESCRIPTION}
              marginTop={sizes.sm}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              Password
            </Text>

            <TextField
              type='password'
              label='Password'
              name={ENTITY_TEMPLATE_FIELDS.PASSWORD}
            />
            <TextField
              type='password'
              label='Prefilled Password'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_PASSWORD}
              marginTop={sizes.sm}
            />
            <TextField
              type='password'
              label='Disabled Password'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_PASSWORD}
              marginTop={sizes.sm}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              Number
            </Text>

            <NumberField
              type='number'
              label='Age'
              name={ENTITY_TEMPLATE_FIELDS.AGE}
            />
            <NumberField
              type='number'
              label='Prefilled Age'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_AGE}
              marginTop={sizes.sm}
            />
            <NumberField
              type='number'
              label='Disabled Age'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_AGE}
              marginTop={sizes.sm}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              Decimal
            </Text>

            <NumberField
              decimalSeparator
              label='Price of gas'
              name={ENTITY_TEMPLATE_FIELDS.PRICE_OF_GAS}
            />
            <NumberField
              decimalSeparator
              label='Prefilled Price of gas'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_PRICE_OF_GAS}
              marginTop={sizes.sm}
            />
            <NumberField
              decimalSeparator
              label='Disabled Price of gas'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_PRICE_OF_GAS}
              marginTop={sizes.sm}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              Select
            </Text>

            <SelectBox
              label='Role'
              name={ENTITY_TEMPLATE_FIELDS.ROLE_ID}
              options={ROLE_OPTIONS}
            />
            <SelectBox
              label='Prefilled Role'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_ROLE_ID}
              options={ROLE_OPTIONS}
              marginTop={sizes.sm}
            />
            <SelectBox
              label='Disabled Role'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_ROLE_ID}
              options={ROLE_OPTIONS}
              marginTop={sizes.sm}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              Checkbox
            </Text>

            <Checkbox
              //
              label='Owns Dog'
              name={ENTITY_TEMPLATE_FIELDS.OWNS_DOG}
            />
            <Checkbox
              label='Owns Cat'
              name={ENTITY_TEMPLATE_FIELDS.OWNS_CAT}
              style={{
                marginTop: sizes.xs,
              }}
            />

            <Checkbox
              label='Prefilled Owns Dog'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_OWNS_DOG}
              style={{
                marginTop: sizes.m,
              }}
            />
            <Checkbox
              label='Prefilled Owns Cat'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_OWNS_CAT}
              style={{
                marginTop: sizes.xs,
              }}
            />

            <Checkbox
              label='Disabled Owns Dog'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_OWNS_DOG}
              style={{
                marginTop: sizes.m,
              }}
            />
            <Checkbox
              label='Disabled Owns Cat'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_OWNS_CAT}
              style={{
                marginTop: sizes.xs,
              }}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              Switch
            </Text>

            <Switch
              //
              label='Ready to Golf'
              name={ENTITY_TEMPLATE_FIELDS.READY_TO_GOLF}
            />
            <Switch
              label='Prefilled Ready to Golf'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_READY_TO_GOLF}
              style={{
                marginTop: sizes.sm,
              }}
            />
            <Switch
              label='Disabled Ready to Golf'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_READY_TO_GOLF}
              style={{
                marginTop: sizes.sm,
              }}
            />

            <Divider />
            <Text size='p' bold variant='danger'>
              Date
            </Text>

            {/* <FormInput
              type="date"
              label="Birthday"
              name={ENTITY_TEMPLATE_FIELDS.BIRTHDAY}
            />
            <FormInput
              type="time"
              label="Arrival at Work Time"
              name={ENTITY_TEMPLATE_FIELDS.ARRIVAL_AT_WORK_TIME}
            />
            <FormInput
              type="datetime"
              label="Next Meeting Time"
              name={ENTITY_TEMPLATE_FIELDS.NEXT_MEETING_DATETIME}
            /> */}

            <DateTime
              //
              label='Birthday'
              name={ENTITY_TEMPLATE_FIELDS.BIRTHDAY}
              mode='date'
            />
            <DateTime
              label='Prefilled Birthday'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_BIRTHDAY}
              mode='date'
              style={{
                marginTop: sizes.sm,
              }}
            />
            <DateTime
              label='Disabled Birthday'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_BIRTHDAY}
              mode='date'
              style={{
                marginTop: sizes.sm,
              }}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              Time
            </Text>

            <DateTime
              label='Arrival at Work Time'
              name={ENTITY_TEMPLATE_FIELDS.ARRIVAL_AT_WORK_TIME}
              mode='time'
            />
            <DateTime
              type='time'
              label='Prefilled Arrival at Work Time'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_ARRIVAL_AT_WORK_TIME}
              mode='time'
              style={{
                marginTop: sizes.sm,
              }}
            />
            <DateTime
              label='Disabled Arrival at Work Time'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_ARRIVAL_AT_WORK_TIME}
              mode='time'
              style={{
                marginTop: sizes.sm,
              }}
            />

            <Divider />

            <Text size='p' bold variant='danger'>
              DateTime
            </Text>

            <DateTime
              mode='datetime'
              label='Next Meeting Time'
              name={ENTITY_TEMPLATE_FIELDS.NEXT_MEETING_DATETIME}
            />
            <DateTime
              mode='datetime'
              label='Prefilled Next Meeting Time'
              name={ENTITY_TEMPLATE_FIELDS.PREFILLED_NEXT_MEETING_DATETIME}
              style={{
                marginTop: sizes.sm,
              }}
            />
            <DateTime
              mode='datetime'
              label='Disabled Next Meeting Time'
              disabled
              name={ENTITY_TEMPLATE_FIELDS.DISABLED_NEXT_MEETING_DATETIME}
              style={{
                marginTop: sizes.sm,
              }}
            />
          </Block>

          <Errors errors={savingErrors} />
        </Block>
      </Block>

      <ActionBar>
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
    </FormProvider>
  );
}

export default EntityTemplateForm;
