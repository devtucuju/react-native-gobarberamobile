import styled from 'styled-components/native';
import { Platform } from 'react-native';

import { getBottomSpace } from "react-native-iphone-x-helper"
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin:${responsiveHeight(8.5)}px 0 ${responsiveHeight(3.2)}px;
  font-size: ${responsiveFontSize(3.2)}px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position:absolute;
  left:0;
  bottom:0;
  right:0;
  background:#312e38;
  border-top-width:1px;
  border-color:#232129;
  padding: ${responsiveHeight(2.1)}px 0 ${16 + getBottomSpace()}px;

  align-items:center;
  justify-content:center;
  flex-direction:row;
`;
export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: ${responsiveFontSize(2.4)}px;
  font-family: 'RobotoSlab-Regular';
  margin-left:${responsiveHeight(2.1)}px;
`;



