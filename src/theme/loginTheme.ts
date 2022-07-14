import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
    zIndex: 1,
  },
  title: {
    fontSize: 25,
    marginTop: 10,
    fontFamily: 'RobotoCondensed-Bold',
  },
  label: {
    marginTop: 25,
    fontSize: 20,
  },
  inputField: {
    color: '#EFEFEF',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 20,
  },
  inputFieldIOS: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  buttom: {
    borderWidth: 2,
    borderColor: '#F66B0E',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonToNav: {position: 'absolute', right: 8},
  buttomText: {
    fontSize: 18,
    fontFamily: 'RobotoCondensed-Bold',
    // color: 'white',
    color: '#F66B0E',
  },
  newUserbuttomText: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  newUserContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});
