import {StyleSheet} from 'react-native';

export const colores = {
  primary: '#5856d6',
};

export const componentStyles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  title: {fontSize: 30, marginBottom: 10},
  botonGrande: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  botonGrandeTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 150,
  },
  avatarInProtected: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },

  menuBoton: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  menuTexto: {fontSize: 24},
});
