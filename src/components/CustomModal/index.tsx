// Modal.js
import React from 'react';
import {TouchableWithoutFeedback, Modal, ViewStyle} from 'react-native';
import {ModalContent, ModalOverlay} from './styles';

interface Props {
  visible: boolean;
  children: Document | Document[];
  transparent?: boolean;
  animationType?: 'fade' | 'none' | 'slide' | undefined;
  overlayStyles?: ViewStyle;
  modalStyles?: ViewStyle;
  dismiss: () => void;
}

export const MyModal = ({
  visible,
  children,
  transparent = true,
  animationType = 'fade',
  overlayStyles = {},
  modalStyles = {},
  dismiss,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      onRequestClose={dismiss}
      animationType={animationType}>
      <TouchableWithoutFeedback onPress={dismiss}>
        <ModalOverlay style={{...overlayStyles}} />
      </TouchableWithoutFeedback>
      <ModalContent style={{...modalStyles}}>{children}</ModalContent>
    </Modal>
  );
};
