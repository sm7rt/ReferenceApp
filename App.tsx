import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from './src/state/store';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <ReduxProvider store={store}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </ReduxProvider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};

export default App;
