import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {User} from '../interfaces';
import {UsersStackParams} from '../navigator/UsersNavigator';
import {FadeInImage} from './FadeInImage';
import Text from '../components/CustomText';

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
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardContainer}
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
            : require('../assets/avatar-placeholder.png')
        }
        style={styles.userImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.userName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.userEmail} numberOfLines={1}>
          {item.email}
        </Text>
      </View>

      {item.active ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.deactivateButton}
          onPress={() => {
            Alert.alert('Are you sure?', 'When presed user will be disabled', [
              {
                text: 'Ok',
                onPress: () => {
                  deactivateUserFunc(item.id);
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {},
              },
            ]);
          }}>
          <Icon name="block" size={27.5} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.activateButton}
          onPress={() => {
            Alert.alert('Are you sure?', 'When presed user will be enabled', [
              {
                text: 'Ok',
                onPress: () => {
                  activateUserFunc(item.id);
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {},
              },
            ]);
          }}>
          <Icon name="done" size={27.5} color="white" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deactivateButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#af0303',
  },
  activateButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#05c105',
  },
  cardContainer: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {width: 55, height: 55, borderRadius: 30},
  textContainer: {
    flex: 1,
  },
  userName: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: -5,
  },
  userEmail: {
    flex: 1,
    fontSize: 14,
    color: '#B5B5B5',
    marginHorizontal: 10,
  },
});
