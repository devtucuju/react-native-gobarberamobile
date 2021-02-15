import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputRefElement = useRef<any>(null)
  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputRefElement.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputRefElement.current.clear();
      }

    })

  }, [fieldName, registerField])


  return (
    <Container>
      <Icon
        name={icon}
        size={20}
        // color={focused ? color : "#222222"}
        // focused={focused}
        color="#666360"
      />
      <TextInput
        ref={inputRefElement}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value
        }}
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default Input;
