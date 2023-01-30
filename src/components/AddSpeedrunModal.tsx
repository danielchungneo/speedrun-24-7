import { COLORS } from '@/constants/colors';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from './Block';
import TextField from './Inputs_NEW/Text/TextField';
import Modal from './Modal';
import SpeedRunForm from './SpeedrunForm';
import Text from './Text';

type SpeedRunFormProps = {
  showModal: boolean,
  onClose: any,
  title: string,
  speedRun?: any,
  userData: any,
  revalidateCache: any,
};

const AddSpeedrunModal = ({
  showModal,
  onClose,
  title,
  speedRun,
  userData,
  revalidateCache
}: SpeedRunFormProps) => {
  const { sizes, colors } = useTheme();

  return (
    <Modal visible={showModal} onClose={onClose}>
      <SpeedRunForm userData={userData} onCloseForm={onClose} title={title} speedRun={speedRun} revalidateCache={revalidateCache} />
      {/* <Block>
        <Text>Hello</Text>
      </Block> */}
    </Modal>
  );
};

export default AddSpeedrunModal;
