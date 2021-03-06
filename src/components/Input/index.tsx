import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
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

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputRefElement = useRef<any>(null)
  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value)
    // if (inputValueRef.current.value) {
    //   setIsFilled(true)
    // } else {
    //   setIsFilled(false)
    // }
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRefElement.current.focus();
    }
  }))
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
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        // color={focused ? color : "#222222"}
        // focused={focused}
        color={isFocused || isFilled ? "#ff9000" : "#666360"}
      />
      <TextInput
        ref={inputRefElement}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value
        }}
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
