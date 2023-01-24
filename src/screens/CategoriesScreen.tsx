import React, {useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useCategory} from '../hooks/useCategory';
import {ProtectedNavigationParams} from '../navigator/ProtectedNavigator';
import {Header} from '../components/Header';
import {CategoryItem} from '../components/categories/CategoryItem';
import {Loading} from '../components/Loading';
import {ItemSeparator} from '../components/ItemSeparator';
import {ScreenContainer} from '../theme/defaultStlyes';
import {useTheme} from 'styled-components';
import {CategoriesModal} from '../components/categories/CategoriesModal';
import {useShowErrorMessages} from '../hooks/useShowErrorMessages';

interface Props
  extends DrawerScreenProps<ProtectedNavigationParams, 'CategoriesScreen'> {}

export const CategoriesScreen = ({navigation}: Props) => {
  const {colors} = useTheme();

  const {
    categories,
    error,
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

  useShowErrorMessages(error);

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

  return (
    <>
      <ScreenContainer refreshing={refreshing}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing || loading}
              onRefresh={loadProductsFromBackend}
              progressViewOffset={10}
              progressBackgroundColor={colors.headerBackground}
              colors={[colors.text]}
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
