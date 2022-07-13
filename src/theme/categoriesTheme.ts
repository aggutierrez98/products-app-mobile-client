import {StyleSheet} from 'react-native';

export const categoriesStyles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#112B3C',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {fontSize: 18, marginBottom: 10},
  textInput: {
    color: '#EFEFEF',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: '#205375',
    height: 45,
    marginTop: 5,
    marginBottom: 20,
  },
  categoryName: {
    fontSize: 20,
    color: '#EFEFEF',
  },
  modalView: {},
  button: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonSave: {
    backgroundColor: '#F66B0E',
    width: '40%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
