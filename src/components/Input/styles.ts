import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Feather } from '@expo/vector-icons';
export const Container = styled.View`
  width: 100%;
  /* height: 60px; */
  height: ${responsiveHeight(8)}px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  /* margin-bottom: 8px; */
  margin-bottom:${responsiveHeight(1.7)}px;

  flex-direction:row;
  align-items:center;
`;
export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  /* font-size: 16px; */
  font-size: ${responsiveFontSize(2.1)}px;
  font-family: 'RobotoSlab-Regular';
`;
export const Icon = styled(Feather)`margin-right:16px`;
