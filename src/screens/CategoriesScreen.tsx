import React, {useEffect, useState} from 'react';
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

interface Props
  extends DrawerScreenProps<ProtectedNavigationParams, 'CategoriesScreen'> {}

export const CategoriesScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);

  const {
    categories,
    newCategoryName,
    inputError,
    refreshing,
    createCategoryHandler,
    deleteCategoryHandler,
    loadProductsFromBackend,
    handleNameChange,
  } = useCategory(closeModal);

  useEffect(() => {
    if (inputError) {
      Alert.alert('Error', 'Error al ingresar categoria', [
        {
          text: 'Ok',
        },
      ]);
    }
  }, [inputError]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 15}}
          onPress={() =>
            setModalVisible((prevVisibility: boolean) => !prevVisibility)
          }>
          <Text style={{color: 'black'}}>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
              refreshing={refreshing}
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
          )}
          ItemSeparatorComponent={() => (
            <View style={categoriesStyles.itemSeparator} />
          )}
        />
      </View>
      <MyModal
        visible={modalVisible}
        dismiss={() => {
          setModalVisible(false);
        }}>
        <View style={categoriesStyles.modalContent}>
          <Text style={categoriesStyles.label}>
            Nombre de la nueva categoria
          </Text>
          <TextInput
            placeholder="Categoria"
            style={categoriesStyles.textInput}
            placeholderTextColor="grey"
            value={newCategoryName}
            onChangeText={handleNameChange}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={[categoriesStyles.button, categoriesStyles.buttonSave]}
            onPress={() => createCategoryHandler()}>
            <Text style={categoriesStyles.textStyle}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </MyModal>
    </>
  );
};
