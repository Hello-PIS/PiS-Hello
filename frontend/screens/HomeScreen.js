import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '../components/MenuItem';

export default function HomeScreen() {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  
  function renderHeader() {
    return (
      <View style={{
        width: '100%',
        height: '30%',
        alignItems: 'center',
        backgroundColor: '#9932CC',
        marginBottom: 10,
      }}>
        <View style={{flex: 2}}/>
        <Text style={styles.headerPrimary}>Witaj.</Text>
        <Text style={styles.headerSecondary}>Co chcesz dziś zrobić?</Text>
        <View style={{flex: 1}}/>
      </View>
    );
}
  return (
    <View style={{justifyContent: 'center', width: '100%', flex: 1}}>
        <ScrollView contentContainerStyle={styles.list}>
          <View>
            <StatusBar translucent backgroundColor='transparent' />
            {renderHeader()}
            <MenuItem text={'Nowa wizytówka'} icon={'pluscircleo'} onPress={() => navigation.navigate('Camera')} />
            <MenuItem text={'Moje wizytówki'} icon={'creditcard'} onPress={() => navigation.navigate('MyBusinessCards')} />
            <MenuItem text={'Znajdź wizytówkę'} icon={'search1'} onPress={() => navigation.navigate('SearchBusinessCards')} />
            <MenuItem text={'Wyloguj'} icon={'logout'} onPress={() => {global.user_id = null; navigation.navigate('SignIn'); }} />
          </View>
        </ScrollView>
    </View>

    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <Text style={{marginTop: 40, marginBottom: 10,}}>Hello, your token: {token}</Text>

    //   {/* <Image
    //     resizeMode='center'
    //     source={{uri: `http://${serverAddress.address}:8080/image` }}
    //     style={{flex: 1, borderRadius: 10, aspectRatio: 1}}
    //   /> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexGrow: 1,
  },
  headerPrimary: {
    color: 'white',
    fontSize: 46,
    padding: 10,
},
headerSecondary: {
    color: 'white',
    fontSize: 24,
},
});
