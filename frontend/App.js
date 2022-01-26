import React, { useState, useEffect } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import ReduxThunk from 'redux-thunk';

import { StyleSheet, SafeAreaView, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation';

import authReducer from './reducers/auth';
import searchReducer from './reducers/search';
import businessCardsReducer from './reducers/businessCards';
import LoadingScreenModal from './components/LoadingScreenModal';

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  businessCards: businessCardsReducer,
  // storage: storageReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = async () => {
  await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const getAsyncData = async () => {
        await Font.loadAsync({
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
          'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        });
        setFontLoaded(true);
    }
    getAsyncData();
  }, [])

  if (!fontLoaded) {
    return (
      <View>
        <LoadingScreenModal amIVisible={Platform.OS === 'ios' ? false : true} />
      </View>
    );
  }
  return (
      <Provider store={store}>
        {/* <SafeAreaView style={styles.root}> */}
          <AppNavigation />
        {/* </SafeAreaView> */}
      </Provider>
    );

  // return (
  //   <AppLoading
  //   startAsync={fetchFonts}
  //   onFinish={() => setFontLoaded(true)}
  //   onError={(error) => console.warn(error)}
  // />

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

