import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert} from 'react-native';
import {User} from '../../interfaces';
import {UsersStackParams} from '../../navigator/UsersNavigator';
import {FadeInImage} from '../FadeInImage';
import {
  DeleteButton,
  Detail,
  Icon,
  Name,
  TextContainer,
} from '../categories/styles';
import {ActiveButton} from '../users/styles';
import {CardContainer} from '../products/styles';

type NavigationProps = NativeStackNavigationProp<UsersStackParams>;

export const UserItem = ({
  item,
  deactivateUserFunc,
  activateUserFunc,
}: {
  item: User;
  deactivateUserFunc: (id: string) => void;
  activateUserFunc: (id: string) => void;
}) => {
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <CardContainer
      activeOpacity={0.8}
      onPress={() => {
        navigate('UserScreen', {
          id: item.id,
          name: item.name,
        });
      }}>
      <FadeInImage
        source={
          item?.image
            ? {
                uri: item?.image,
              }
            : require('../../assets/avatar-placeholder.png')
        }
        style={{width: 55, height: 55, borderRadius: 30}}
      />
      <TextContainer>
        <Name numberOfLines={1}>{item.name}</Name>
        <Detail numberOfLines={1}>{item.email}</Detail>
      </TextContainer>

      {item.active ? (
        <DeleteButton
          activeOpacity={0.7}
          onPress={() => {
            Alert.alert('Are you sure?', 'When presed user will be disabled', [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {},
              },
              {
                text: 'Deactivate',
                onPress: () => {
                  deactivateUserFunc(item.id);
                },
              },
            ]);
          }}>
          <Icon name="block" />
        </DeleteButton>
      ) : (
        <ActiveButton
          activeOpacity={0.7}
          onPress={() => {
            Alert.alert(
              'Are you sure?',
              'When presed user will be enabled',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => {},
                },
                {
                  text: 'Activate',
                  onPress: () => {
                    activateUserFunc(item.id);
                  },
                },
              ],
              {cancelable: true},
            );
          }}>
          <Icon name="done" size={27.5} color="white" />
        </ActiveButton>
      )}
    </CardContainer>
  );
};
