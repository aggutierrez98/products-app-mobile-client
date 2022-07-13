import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from './CustomText';
import {MyModal} from './CustomModal';

interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  takePhoto: () => void;
  takePhotoFromGallery: () => void;
}

export const ModalEditPhoto = ({
  modalVisible,
  closeModal,
  takePhoto,
  takePhotoFromGallery,
}: Props) => {
  return (
    <MyModal
      visible={modalVisible}
      dismiss={closeModal}
      modalStyles={{
        width: 270,
        flex: 0,
        marginTop: 170,
      }}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonStyle}
          onPress={takePhoto}>
          <Text style={{fontSize: 20}}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonStyle}
          onPress={takePhotoFromGallery}>
          <Text style={{fontSize: 20}}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#112B3C',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonStyle: {
    backgroundColor: '#F66B0E',
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
  },
});
