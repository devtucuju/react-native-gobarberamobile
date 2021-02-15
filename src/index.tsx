import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import * as Updates from 'expo-updates';
import { useFonts } from 'expo-font';
import { registerRootComponent } from 'expo';

import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import RobotoSlabMedium from '../assets/fonts/RobotoSlab-Medium.ttf';
import RobotoSlabRegular from '../assets/fonts/RobotoSlab-Regular.ttf';

import Routes from './routes';

const App: React.FC = () => {
  // useEffect(() => {
  //   async function updateApp() {
  //     const { isAvailable } = await Updates.checkForUpdateAsync();
  //     if (isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync(); // depende da sua estratégia
  //     }
  //   }
  //   updateApp();
  // }, []);
  const [loaded] = useFonts({
    'RobotoSlab-Medium': RobotoSlabMedium,
    'RobotoSlab-Regular': RobotoSlabRegular,
  });

  if (!loaded) {
    return null;
  }

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
