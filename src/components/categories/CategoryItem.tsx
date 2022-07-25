import React from 'react';
import {Alert} from 'react-native';
import {Category} from '../../interfaces';
import {
  ButtonsContainer,
  CardContainer,
  Name,
  Detail,
  DeleteButton,
  EditButton,
  TextContainer,
  Icon,
} from './styles';

export const CategoryItem = ({
  item,
  openModal,
  deleteCategoryHandler,
}: {
  item: Category;
  openModal: (arg1: string, arg2: 'Add' | 'Edit', arg3: any) => void;
  deleteCategoryHandler: (id: string) => void;
}) => {
  return (
    <CardContainer>
      <TextContainer>
        <Name numberOfLines={1}>{item.name}</Name>
        <Detail numberOfLines={1}>{item.user.name}</Detail>
      </TextContainer>
      <ButtonsContainer>
        <EditButton
          activeOpacity={0.7}
          onPress={() => {
            openModal('Edit', 'Edit', item);
          }}>
          <Icon name="edit" />
        </EditButton>
        <DeleteButton
          activeOpacity={0.7}
          onPress={() => {
            Alert.alert(
              'Are you sure to delete?',
              'When pressed it cannot be undone',
              [
                {
                  text: 'Cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => {
                    deleteCategoryHandler(item.id);
                  },
                },
              ],
              {cancelable: true},
            );
          }}>
          <Icon name="delete-outline" />
        </DeleteButton>
      </ButtonsContainer>
    </CardContainer>
  );
};
