import React, { useCallback, useRef } from 'react';
import { Alert, Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useAuth } from '../../context/auth';
import getValidationsErros from '../../utils/getValidationsErros';
import { SafeAreaView } from "react-native-safe-area-context";
import logo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { signIn, user } = useAuth();
  console.log(user);

  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email Obrigatório')
            .email('Digite um email válido!'),
          password: Yup.string().required('Senha Obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
        // navigation.navigate("/dashboard");
      } catch (err) {

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na Autenticação!',
          'Ocorreu um erro ao fazer login, cheque as credenciais!'
        )

      }
    },
    [signIn],
  );


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
              <Title>Faça seu Logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
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

            <ForgotPassword onPress={() => { }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Feather name={'log-in'} size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </SafeAreaView>
  );
};

export default SignIn;


// 4px  -> 0.5
// 8px  -> 1.7
// 16px -> 2.1
// 18px -> 2.4
// 24px -> 3.2
// 30px -> 4
// 32px -> 4.3
// 60px -> 8
// 64px -> 8.5

