import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#312e38" />
    </NavigationContainer>
  );
};

registerRootComponent(App);
