import { COLORS } from '@/constants/colors';
import useTheme from '@/utils/hooks/context/useTheme';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import Block from './Block';
import ActionBar from './Buttons/ActionBar';
import CancelButton from './Buttons/CancelButton';
import DeleteButton from './Buttons/DeleteButton';
import SaveButton from './Buttons/SaveButton';
import TextField from './Inputs_NEW/Text/TextField';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export const SPEED_RUN_FIELDS = {
  // textfield: text
  NAME: 'name',
  DESCRIPTION: 'description',
};

const formValidationSchema = Yup.object({
  [SPEED_RUN_FIELDS.NAME]: Yup.string().required(),
  [SPEED_RUN_FIELDS.DESCRIPTION]: Yup.string().nullable(),
});

type SpeedRunFormProps = {
  speedRun?: any,
  onCloseForm: (refetch?: boolean) => void,
  title: string,
  userData: any,
  revalidateCache: () => void,
};

function SpeedRunForm({
  speedRun,
  onCloseForm,
  title,
  userData,
  revalidateCache
}: SpeedRunFormProps) {
  const { styles, assets, colors, fonts, gradients, sizes } = useTheme();
  const insets = useSafeAreaInsets();

  const defaultValues = {};

  const scrollRef = useRef();

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: speedRun || defaultValues,
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

  const { getItem, setItem } = useAsyncStorage('userData');

  const saveData = async (value: any) => {
    await setItem(value);
  };

  const onSubmit = (values: any) => {
    if (userData) {
      saveData(JSON.stringify([...userData, values]));
    } else {
      saveData(JSON.stringify([values]));
    }
    revalidateCache();
    onCloseForm()
  };

  return (
    <FormProvider {...formMethods}>
      <Block
        keyboard
        ref={scrollRef}
        extraScrollHeight={insets.bottom}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingBottom: insets.bottom + 50,
          },
        ]}
      >
        <TextField
          //
          label="Name"
          name={SPEED_RUN_FIELDS.NAME}
        />

        <TextField
          type="textarea"
          label="Description"
          name={SPEED_RUN_FIELDS.DESCRIPTION}
        />
      </Block>

      <ActionBar>
        <CancelButton onPress={onCloseForm} />

        {/* {speedRun && (
          <DeleteButton
            request={id => api.entities.customers.delete({ path: { id } })}
          />
        )} */}

        <SaveButton
          text={speedRun ? 'Save' : 'Add Run'}
          color={COLORS.GREEN}
          onPress={handleSubmit(onSubmit)}
        />
      </ActionBar>
    </FormProvider>
  );
}

export default SpeedRunForm;
