import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import storeConfig from './src/store/storeConfig';
import App from './src/App';

const Redux = () => (
  <Provider store={storeConfig()}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);
