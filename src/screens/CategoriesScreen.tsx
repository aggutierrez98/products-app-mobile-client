import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {MyModal} from '../components/CustomModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useCategory} from '../hooks/useCategory';
import {categoriesStyles} from '../theme/categoriesTheme';
import {ProtectedNavigationParams} from '../navigator/ProtectedNavigator';
import {Header} from '../components/Header';

interface Props
  extends DrawerScreenProps<ProtectedNavigationParams, 'CategoriesScreen'> {}

export const CategoriesScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();

  const {
    categories,
    inputError,
    loading,
    refreshing,
    categoryName,
    modalVisible,
    modalData,
    saveOrUpdateCategory,
    deleteCategoryHandler,
    loadProductsFromBackend,
    handleNameChange,
    openModal,
    closeModal,
  } = useCategory();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="Categories"
          text="Add"
          onPress={() => {
            openModal('Add', 'Add');
          }}
        />
      ),
    });
  }, [navigation, openModal]);

  useEffect(() => {
    if (inputError) {
      Alert.alert('Error', 'Error al ingresar categoria', [
        {
          text: 'Ok',
        },
      ]);
    }
  }, [inputError]);

  return (
    <>
      <View
        style={{
          marginTop: refreshing ? top + 20 : 0,
          flex: 1,
          marginHorizontal: 10,
        }}>
        <FlatList
          style={{marginTop: 10}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || loading}
              onRefresh={loadProductsFromBackend}
              progressViewOffset={10}
              progressBackgroundColor="white"
              colors={['black']}
            />
          }
          data={categories}
          keyExtractor={product => product.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={categoriesStyles.categoryName}>{item.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '15%',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    openModal('Edit', 'Edit', item);
                  }}>
                  <Icon name="edit" size={23} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Estas seguro',
                      'Eliminaras la categoria y no se podra recuperar',
                      [
                        {
                          text: 'Ok',
                          onPress: () => {
                            deleteCategoryHandler(item.id);
                          },
                        },
                        {
                          text: 'Cancelar',
                          onPress: () => {},
                        },
                      ],
                    );
                  }}>
                  <Icon name="delete-outline" size={23} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={categoriesStyles.itemSeparator} />
          )}
        />
      </View>
      <MyModal visible={modalVisible} dismiss={closeModal}>
        <View style={categoriesStyles.modalContent}>
          <Text style={categoriesStyles.label}>{modalData.title}</Text>
          <TextInput
            placeholder="Categoria"
            style={categoriesStyles.textInput}
            placeholderTextColor="grey"
            value={categoryName}
            onChangeText={handleNameChange}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={[categoriesStyles.button, categoriesStyles.buttonSave]}
            onPress={() => {
              saveOrUpdateCategory(modalData.categoryData?.id);
            }}>
            <Text style={categoriesStyles.textStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </MyModal>
    </>
  );
};
