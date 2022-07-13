import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {MyModal} from '../components/CustomModal';
import {useCategory} from '../hooks/useCategory';
import {categoriesStyles} from '../theme/categoriesTheme';
import {ProtectedNavigationParams} from '../navigator/ProtectedNavigator';
import {Header} from '../components/Header';
import {CategoryItem} from '../components/CategoryItem';
import {ItemSeparator} from '../components/ItemSeparator';
import Text from '../components/CustomText';
import {Loading} from './Loading';

interface Props
  extends DrawerScreenProps<ProtectedNavigationParams, 'CategoriesScreen'> {}

export const CategoriesScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();

  const {
    categories,
    inputError,
    loading,
    loadingMutation,
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
              progressBackgroundColor="#205375"
              colors={['#EFEFEF', '#F66B0E']}
            />
          }
          data={categories}
          keyExtractor={product => product.id}
          renderItem={({item}) => (
            <CategoryItem
              item={item}
              deleteCategoryHandler={deleteCategoryHandler}
              openModal={openModal}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
      <MyModal visible={modalVisible} dismiss={closeModal}>
        <View style={categoriesStyles.modalContent}>
          <Text style={categoriesStyles.label}>{modalData.title}</Text>
          <TextInput
            placeholder="Category"
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
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </MyModal>

      {loadingMutation && <Loading />}
    </>
  );
};
