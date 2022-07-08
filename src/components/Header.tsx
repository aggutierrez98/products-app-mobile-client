import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Header = ({
  backButton = false,
  title,
  text,
  onPress,
}: {
  backButton?: boolean;
  title?: string;
  text?: string;
  onPress?: Function;
}) => {
  const {dispatch, goBack} = useNavigation();

  return (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 15,
      }}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        {backButton ? (
          <TouchableOpacity activeOpacity={0.5} onPress={() => goBack()}>
            <Icon
              style={{marginRight: 15}}
              name="arrow-back"
              size={23}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => dispatch(DrawerActions.openDrawer())}>
            <Icon
              style={{marginRight: 15}}
              name="reorder"
              size={23}
              color="black"
            />
          </TouchableOpacity>
        )}
        <Text style={{color: 'black', fontSize: 20}}>{title}</Text>
      </View>

      {onPress && text && (
        <TouchableOpacity
          style={{
            backgroundColor: '#2011c4',
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            margin: 0,
          }}
          activeOpacity={0.8}
          onPress={() => onPress()}>
          <Text style={{color: 'white', fontSize: 20}}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
