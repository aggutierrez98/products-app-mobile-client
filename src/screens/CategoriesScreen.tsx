import React, {useEffect} from 'react';
import {Alert, FlatList, RefreshControl} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useCategory} from '../hooks/useCategory';
import {ProtectedNavigationParams} from '../navigator/ProtectedNavigator';
import {Header} from '../components/Header';
import {CategoryItem} from '../components/CategoryItem';
import {Loading} from '../components/Loading';
import {ItemSeparator} from '../theme/components/ItemSeparator';
import {ScreenContainer} from '../theme/defaultStlyes';
import {useTheme} from 'styled-components';
import {CategoriesModal} from '../components/CategoriesModal';

interface Props
  extends DrawerScreenProps<ProtectedNavigationParams, 'CategoriesScreen'> {}

export const CategoriesScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();

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
      <ScreenContainer refreshing={refreshing} top={top}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing || loading}
              onRefresh={loadProductsFromBackend}
              progressViewOffset={10}
              progressBackgroundColor={colors.foreground}
              colors={[colors.text, colors.primary]}
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
      </ScreenContainer>

      <CategoriesModal
        categoryName={categoryName}
        closeModal={closeModal}
        modalData={modalData}
        modalVisible={modalVisible}
        handleNameChange={handleNameChange}
        saveOrUpdateCategory={saveOrUpdateCategory}
      />

      {loadingMutation && <Loading />}
    </>
  );
};
