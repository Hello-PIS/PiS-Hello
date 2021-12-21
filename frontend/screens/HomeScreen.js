import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';

import * as loginActions from '../actions/login';

export default function HomeScreen() {
  const navigation = useNavigation();
  const token = useSelector((state) => state.login.token);
  // const dispatch = useDispatch();

  // const [waitingForResponse, setWaitingForResponse] = useState(false);

  // useEffect(() => {
  //     //dispatch(loginActions.signIn('bajo', 'jajo'));
  //   }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>Hello, your token: {token}</Text>
      {/* <Text>Hello, your name: {name}</Text> */}
      <StatusBar style="auto" />

      <Image
        resizeMode='center'
        source={{uri: `https://www.oetker.pl/Recipe/Recipes/oetker.pl/pl-pl/baking/image-thumb__51836__RecipeDetailsLightBox/szarlotka-z-karmelowo-orzechowa-kruszonka.jpg`}} // `http://${serverAddress.address}:8080/szarlotka`
        style={{flex: 1, borderRadius: 10, aspectRatio: 1}}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
