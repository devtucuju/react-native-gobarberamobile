import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#312e38' }}>
        <View />
      </SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#312e38" />
    </>
  );
};

registerRootComponent(App);
