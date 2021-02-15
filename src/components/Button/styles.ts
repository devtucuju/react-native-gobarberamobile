import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export const Container = styled(RectButton)`
  width: 100%;
  /* height: 60px; */
  height: ${responsiveHeight(8)}px;
  background: #ff9900;
  border-radius: 10px;
  margin-top:${responsiveHeight(1.2)}px;
  /* margin-top:8px; */

  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled.Text`
  font-family: RobotoSlab-Medium;
  color: #312e38;
  /* font-size: 18px; */
  font-size: ${responsiveFontSize(2.4)}px;
`;
