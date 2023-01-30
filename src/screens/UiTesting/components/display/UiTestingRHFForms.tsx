import Block from '@/components/Block';
import SaveButton from '@/components/Buttons/SaveButton';
import Divider from '@/components/Divider';
import PhotoPicker from '@/components/Inputs_NEW/File/PhotoPicker';
import SelectBox from '@/components/Inputs_NEW/Select/SelectBox';
import TextField from '@/components/Inputs_NEW/Text/TextField';
import Text from '@/components/Text';
import { states } from '@/constants/states';
import useTheme from '@/utils/hooks/context/useTheme';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const ENTITY_TEMPLATE_FIELDS = {
  USERNAME: 'username',
  ABOUT: 'about',
  PHOTO: 'photo',
  COVER_PHOTO: 'coverPhoto',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  COUNTRY: 'country',
  STREET: 'street',
  CITY: 'city',
  STATE: 'state',
  ZIP: 'zip',
  NOTIFICATION_COMMENTS: 'notificationComments',
  NOTIFICATION_CANDIDATES: 'notificationCandidates',
  NOTIFICATION_OFFERS: 'notificationOffers',
  PUSH_NOTIFICATION_PREFERENCE: 'pushNotificationPreference',
};

// Form Validation
const formValidationSchema = Yup.object({
  [ENTITY_TEMPLATE_FIELDS.USERNAME]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.ABOUT]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PHOTO]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.COVER_PHOTO]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.FIRST_NAME]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.LAST_NAME]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.EMAIL]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.COUNTRY]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.STREET]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.CITY]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.STATE]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.ZIP]: Yup.string(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.NOTIFICATION_COMMENTS]: Yup.boolean(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.NOTIFICATION_CANDIDATES]: Yup.boolean(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.NOTIFICATION_OFFERS]: Yup.boolean(), // .required(),
  [ENTITY_TEMPLATE_FIELDS.PUSH_NOTIFICATION_PREFERENCE]: Yup.string(), // .required(),
});

const UiTestingRHFForms = () => {
  // #region STATE
  const [formValues, setFormValues] = useState({
    username: '',
    about: '',
    photo: '',
    coverPhoto: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    notificationComments: false,
    notificationCandidates: false,
    notificationOffers: false,
    pushNotificationPreference: null,
  });
  // #endregion

  // #region HOOKS
  const { sizes, colors } = useTheme();

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: {},
  });

  // #endregion

  // #region COMPUTED
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
  // #endregion

  // #region FUNCTIONS
  const updateFormField = (key: string) => (e: any) => {
    const { value } = e.target;
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  function onSubmit (values: any) {
    if (values.failRequest) {
      values.id = 'fail';
    }

    console.log('onSubmit', values);

    // saveEntity?.(values);
  }
  // #endregion

  // #region EFFECTS
  // #endregion

  return (
    <FormProvider {...formMethods}>
      <Block
        width='100%'
        // keyboard
      >
        <Text size='h6'>Profile</Text>
        <Text size='s6' color={colors.neutral} marginTop={sizes.xs}>
          This information will be displayed publicly so be careful what you
          share.
        </Text>

        <Divider />

        <TextField
          // form={false}
          label='Username'
          name='username'
          // value={formValues.username}
          // onChange={updateFormField('username')}
          prepend={'workcation.com/ '}
        />

        <Divider />

        <TextField
          form={false}
          label='About'
          type='textarea'
          value={formValues.about}
          onChange={updateFormField('about')}
        />

        <Divider />

        <PhotoPicker
          //
          form={false}
          label='Single Image Picker'
          value={formValues.photo}
          onChange={updateFormField('photo')}
        />

        <Divider />

        <Text size='h6' marginTop={sizes.md}>
          Personal Information
        </Text>
        <Text size='s6' color={colors.neutral} marginTop={sizes.xs}>
          Use a permanent address where you can receive mail.
        </Text>

        <Divider />

        <TextField
          form={false}
          label='First Name'
          value={formValues.firstName}
          onChange={updateFormField('firstName')}
        />

        <Divider />

        <TextField
          form={false}
          label='Last Name'
          value={formValues.lastName}
          onChange={updateFormField('lastName')}
        />

        <Divider />

        <TextField
          form={false}
          label='Email address'
          value={formValues.email}
          onChange={updateFormField('email')}
        />

        <Divider />

        <SelectBox
          form={false}
          label='Country'
          value={formValues.country}
          onChange={updateFormField('country')}
          options={[
            {
              value: 'US',
              label: 'United States',
            },
            {
              value: 'CA',
              label: 'Canada',
            },
          ]}
          enableSearchBox
        />

        <Divider />

        <TextField
          form={false}
          label='Street address'
          value={formValues.street}
          onChange={updateFormField('street')}
        />

        <Divider />

        <TextField
          form={false}
          label='City'
          value={formValues.city}
          onChange={updateFormField('city')}
        />

        <Divider />

        <SelectBox
          form={false}
          label='State / Province'
          value={formValues.state}
          onChange={updateFormField('state')}
          options={states.map(s => ({
            value: s.abbreviation,
            label: s.name,
          }))}
          enableSearchBox
        />

        <Divider />

        <TextField
          form={false}
          label='Zip / Postal code'
          value={formValues.zip}
          onChange={updateFormField('zip')}
          keyboardType='number-pad'
        />

        <Divider />

        <SaveButton
          // saving={saving}
          // disabled={loading || saving}
          onPress={handleSubmit(onSubmit)}
        />
      </Block>
    </FormProvider>
  );
};

export default UiTestingRHFForms;
