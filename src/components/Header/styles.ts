import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from '../../theme/defaultStlyes';

export const HeaderContainer = styled.SafeAreaView`
  background-color: ${p => p.theme.colors.headerBackground};
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 60px;
  padding: 0 15px;
`;

export const LeftContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const HeaderIcon = styled(Icon)`
  margin-right: 15px;
  font-size: 30px;
  color: ${p => p.theme.colors.headerText};
`;

export const HeaderTitle = styled(Text)`
  font-size: 22px;
  font-family: ${p => p.theme.fonts.boldItalic};
`;

export const HeaderButton = styled.TouchableOpacity`
  background-color: ${p => p.theme.colors.headerButtonBackground};
  padding: 5px 15px;
  border-radius: 10px;
  margin: 0px;
`;

export const HeaderButtonText = styled(Text)`
  font-size: 20px;
  font-family: ${p => p.theme.fonts.regular};
  color: ${p => p.theme.colors.background};
`;
