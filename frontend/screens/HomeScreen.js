import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';

import * as loginActions from '../actions/login';

export default function HomeScreen() {
  const navigation = useNavigation();
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
      //dispatch(loginActions.signIn('bajo', 'jajo'));
    }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>Henlo, mój token: {token}</Text>
      <StatusBar style="auto" />
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
