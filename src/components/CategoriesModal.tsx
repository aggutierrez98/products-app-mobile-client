import React from 'react';
import {
  ModalContentContainer,
  ModalInput,
  ModalTitle,
} from '../theme/components/CategoriesModal';
import {ButtonSave, ButtonSaveText} from '../theme/defaultStlyes';
import {MyModal} from './CustomModal';

interface Props {
  modalVisible: boolean;
  categoryName: string;
  closeModal: () => void;
  modalData: {
    title: string | null;
    option: 'Add' | 'Edit';
    categoryData?:
      | {
          id: string;
          name: string;
        }
      | undefined;
  };
  saveOrUpdateCategory: (id?: string | undefined) => Promise<void>;
  handleNameChange: (value: string) => void;
}

export const CategoriesModal = ({
  categoryName,
  modalData,
  modalVisible,
  handleNameChange,
  closeModal,
  saveOrUpdateCategory,
}: Props) => {
  return (
    <MyModal visible={modalVisible} dismiss={closeModal}>
      <ModalContentContainer>
        <ModalTitle>{modalData.title}</ModalTitle>
        <ModalInput
          placeholder="Category"
          placeholderTextColor="grey"
          value={categoryName}
          onChangeText={handleNameChange}
        />
        <ButtonSave
          activeOpacity={0.8}
          onPress={() => saveOrUpdateCategory(modalData.categoryData?.id)}>
          <ButtonSaveText>Save</ButtonSaveText>
        </ButtonSave>
      </ModalContentContainer>
    </MyModal>
  );
};
