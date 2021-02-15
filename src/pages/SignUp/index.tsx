import React, { useRef, useCallback } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { SafeAreaView } from "react-native-safe-area-context";
import logo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,

} from './styles';


const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback((data: object) => {
    console.log(data);

  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>

            <Image source={logo} />
            <View>
              <Title>Crie sua Conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="Email" />
              <Input name="password" icon="lock" placeholder="Senha" />
            </Form>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
      </Button>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => { navigation.goBack() }}>
        <Feather name={'arrow-left'} size={20} color="#fff" />
        <BackToSignInText>Voltar para o login</BackToSignInText>
      </BackToSignIn>
    </SafeAreaView>
  );
};

export default SignUp;


// 4px  -> 0.5
// 8px  -> 1.7
// 16px -> 2.1
// 18px -> 2.4
// 24px -> 3.2
// 32px -> 4.3
// 60px -> 8
// 64px -> 8.5

