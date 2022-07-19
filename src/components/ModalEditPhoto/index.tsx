import React from 'react';
import {ModalButton, ButtonsContainer} from './styles';
import {ButtonSaveText, defaultStyles} from '../../theme/defaultStlyes';
import {MyModal} from '../CustomModal';

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
        width: 260,
        marginTop: -400,
      }}>
      <ButtonsContainer style={defaultStyles.shadowBox}>
        <ModalButton activeOpacity={0.8} onPress={takePhoto}>
          <ButtonSaveText>Camera</ButtonSaveText>
        </ModalButton>
        <ModalButton activeOpacity={0.8} onPress={takePhotoFromGallery}>
          <ButtonSaveText>Gallery</ButtonSaveText>
        </ModalButton>
      </ButtonsContainer>
    </MyModal>
  );
};
