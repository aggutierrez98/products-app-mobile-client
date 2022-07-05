// Modal.js
import React from 'react';
import {TouchableWithoutFeedback, StyleSheet, Modal, View} from 'react-native';

interface Props {
  visible: boolean;
  children: Document | Document[];
  transparent?: boolean;
  animationType?: 'fade' | 'none' | 'slide' | undefined;
  dismiss: () => void;
}

export const MyModal = ({
  visible,
  children,
  transparent = true,
  animationType = 'fade',
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
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>{children}</View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '10%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
