import React, { useRef, useCallback } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationsErros from '../../utils/getValidationsErros';
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

interface SignUpFormData {
  nome: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)


  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        email: Yup.string()
          .required('Email Obrigatório')
          .email('Digite um email válido!'),
        password: Yup.string().min(6, 'No minimo 6 digitos!').required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      // await api.post('/users', data);
      // history.push('/');

      Alert.alert('Cadastro realizado!', "Você já pode fazer seu logon no sistema")


    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErros(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert('Erro no cadastro!', "Ocorreu um erro ao fazer cadastro, tente novamente!")

    }
  }, []);
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
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
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

