import { isAndroid } from "@/constants/platform";
import useTheme from "@/utils/hooks/context/useTheme";
import Block from "./Block";
import Button from "./Buttons/Button";
import Modal from "./Modal";
import Text from "./Text";


type ConfirmationModalProps = {
  showModal: boolean,
  onConfirmation: (object?: any) => void,
  onSuccess?: (response?: any) => void,
  onCancellation?: (response?: any) => void,
  modalText?: string,
};

function ConfirmationModal({
  showModal,
  onSuccess,
  onConfirmation,
  onCancellation,
  modalText = 'Confirm Deletion',
}: ConfirmationModalProps) {
  const { sizes } = useTheme();

  function onConfirm() {
    onConfirmation();
    onSuccess?.();
  }

  return (
    <>
      <Modal
        visible={showModal}
        hideCloseButton
        contentColor={isAndroid ? undefined : 'transparent'}
        backdropColor="rgba(0,0,0,0.5)"
      >
        <Block flex={0} marginTop={sizes.m}>
          <Text variant={isAndroid ? 'black' : 'white'} center size="h4">
            {modalText}
          </Text>

          <Block flex={0} row marginTop={sizes.xl}>
            <Button variant="black" onPress={onCancellation} flex={1}>
              <Text bold variant="white">
                Cancel
              </Text>
            </Button>
            <Block flex={0} width={sizes.sm} />
            <Button variant="danger" onPress={onConfirm} flex={1}>
              <Text bold variant="white">
                Confirm
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
