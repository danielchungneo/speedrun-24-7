import Block from '@/components/Block';
import { StatusBar } from 'expo-status-bar';
import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import PasswordResetRequestForm from '@/components/Entities/Auth/PasswordResetRequestForm';

type ResetPasswordRequestScreenProps = {
  //
};

const ResetPasswordRequestScreen = (props: ResetPasswordRequestScreenProps) => {
  const { styles, sizes, assets, colors } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <StatusBar />

      <Block safe edges={['top', 'left', 'right']}>
        <Block paddingHorizontal={sizes.padding}>
          <Block>
            <PasswordResetRequestForm title="Forgot your password?" />
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default ResetPasswordRequestScreen;
