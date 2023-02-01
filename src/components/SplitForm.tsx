import { COLORS } from '@/constants/colors';
import useTheme from '@/utils/hooks/context/useTheme';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrivateValueStore, useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import Block from './Block';
import ActionBar from './Buttons/ActionBar';
import CancelButton from './Buttons/CancelButton';
import SaveButton from './Buttons/SaveButton';
import TextField from './Inputs_NEW/Text/TextField';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { generateGuid } from '@/utils/data';
import { cloneDeep } from 'lodash';

export const SPEED_RUN_FIELDS = {
  NAME: 'name',
};

const formValidationSchema = Yup.object({
  [SPEED_RUN_FIELDS.NAME]: Yup.string().required(),
});

type SplitFormProps = {
  split?: any,
  onCloseForm: (refetch?: boolean) => void,
  userData: any,
  revalidateCache: () => void,
  selectedRun: any,
};

function SplitForm({
  split,
  onCloseForm,
  userData,
  revalidateCache,
  selectedRun,
}: SplitFormProps) {
  const { styles, assets, colors, fonts, gradients, sizes } = useTheme();
  const insets = useSafeAreaInsets();

  const defaultValues = {};

  const scrollRef = useRef();

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: split || defaultValues,
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
    if (!split) {
      const guid = generateGuid();
      values.id = guid;
      const resultData = userData.map((run: any) => {
        if (run.id === selectedRun.id) {
          run.splits.push(values);
        }
        return run;
      });
      saveData(JSON.stringify(resultData));
    } else {
      const resultData = userData.map((run: any) => {
        if (run.id === values.id) {
          run.splits.find((split: any) => split.id === values.id).name =
            values.name;
        }
        return run;
      });
      console.log(resultData);

      saveData(JSON.stringify(resultData));
    }
    revalidateCache();
    onCloseForm();
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
          type="textarea"
          label="Name"
          name={SPEED_RUN_FIELDS.NAME}
        />
      </Block>

      <ActionBar>
        <CancelButton onPress={onCloseForm} />

        <SaveButton
          text={split ? 'Save' : 'Add Split'}
          color={COLORS.GREEN}
          onPress={handleSubmit(onSubmit)}
        />
      </ActionBar>
    </FormProvider>
  );
}

export default SplitForm;
