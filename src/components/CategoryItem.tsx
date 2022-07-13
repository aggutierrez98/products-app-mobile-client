import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Category} from '../interfaces';
import Text from '../components/CustomText';

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
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.categoryName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.categoryUserName} numberOfLines={1}>
          {item.user.name}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.editButton}
          onPress={() => {
            openModal('Edit', 'Edit', item);
          }}>
          <Icon name="edit" size={27.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Are you sure to delete?',
              'When pressed it cannot be undone',
              [
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    deleteCategoryHandler(item.id);
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => {},
                },
              ],
            );
          }}>
          <Icon name="delete-outline" size={27.5} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#af0303',
  },
  editButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#205375',
  },
  cardContainer: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    width: '26%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: -5,
  },
  categoryUserName: {
    flex: 1,
    fontSize: 14,
    color: '#b5b5b5',
    marginHorizontal: 10,
  },
});
