import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../components/CustomText';

export const Header = ({
  backButton = false,
  title,
  text,
  onPress,
  children,
}: {
  backButton?: boolean;
  title?: string;
  text?: string;
  onPress?: Function;
  children?: Element | Element[];
  childrenProps?: any;
}) => {
  const {dispatch, goBack} = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#205375',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 15,
      }}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        {backButton ? (
          <TouchableOpacity activeOpacity={0.5} onPress={() => goBack()}>
            <Icon
              style={{marginRight: 15}}
              name="arrow-back"
              size={30}
              color="#F66B0E"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => dispatch(DrawerActions.openDrawer())}>
            <Icon
              style={{marginRight: 15}}
              name="reorder"
              size={30}
              color="#F66B0E"
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'RobotoCondensed-Italic',
          }}>
          {title}
        </Text>
      </View>

      {onPress && text && (
        <TouchableOpacity
          style={{
            backgroundColor: '#F66B0E',
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            margin: 0,
          }}
          activeOpacity={0.8}
          onPress={() => onPress()}>
          <Text style={{fontSize: 20}}>{text}</Text>
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};
