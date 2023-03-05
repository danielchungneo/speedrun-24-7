import { COLORS } from '@/constants/colors';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from './Block';
import TextField from './Inputs_NEW/Text/TextField';
import Modal from './Modal';
import SplitForm from './SplitForm';
import Text from './Text';

type CongratsModalProps = {
  showModal: boolean,
  onClose: any,
  currentRun: any,
  userData: any,
  revalidateCache: any,
  selectedRun: any,
};

const CongratsModal = ({
  showModal,
  onClose,
  split,
  userData,
  revalidateCache,
  selectedRun,
}: CongratsModalProps) => {
  const { sizes, colors } = useTheme();

  return (
    <Modal visible={showModal} onClose={onClose}>
      <SplitForm
        userData={userData}
        onCloseForm={onClose}
        split={split}
        revalidateCache={revalidateCache}
        selectedRun={selectedRun}
      />
    </Modal>
  );
};

export default CongratsModal;
