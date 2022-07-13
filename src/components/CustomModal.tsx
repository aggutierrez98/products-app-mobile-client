// Modal.js
import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  View,
  ViewStyle,
} from 'react-native';

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
    <View>
      <Modal
        visible={visible}
        transparent={transparent}
        onRequestClose={dismiss}
        animationType={animationType}>
        <TouchableWithoutFeedback onPress={dismiss}>
          <View style={{...defaultStyles.modalOverlay, ...overlayStyles}} />
        </TouchableWithoutFeedback>
        <View style={{...defaultStyles.modalContent, ...modalStyles}}>
          {children}
        </View>
      </Modal>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalOverlay: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
