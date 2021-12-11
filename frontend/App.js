import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import { StyleSheet, SafeAreaView } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import AppLoading from 'expo-app-loading';

import loginReducer from './reducers/login';

const rootReducer = combineReducers({
  login: loginReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(error) =>
          console.warn(error)}
      />
    );
  }
  return (
      <Provider store={store}>
        <SafeAreaView style={styles.root}>
          <AppNavigation />
        </SafeAreaView>
      </Provider>
    );

  // return (
  //   ##### That's how it's gonna look eventually #####
  //   <Provider store={store}>
  //     <AppNavigator />
  //   </Provider>
  //   )
  // }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});

