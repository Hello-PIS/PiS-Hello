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
        height: '25%',
        alignItems: 'center',
        backgroundColor: '#9932CC',
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
        <StatusBar translucent backgroundColor='transparent' />
        {renderHeader()}
        <ScrollView>
            <MenuItem text={'Nowa wizytówka (Aparat)'} icon={'camera'} onPress={() => navigation.navigate('Camera')} />
            <MenuItem text={'Nowa wizytówka (Galeria)'} icon={'picture'} onPress={() => navigation.navigate('Gallery')} />
            <MenuItem text={'Moje wizytówki'} icon={'creditcard'} onPress={() => navigation.navigate('MyBusinessCards')} />
            <MenuItem text={'Znajdź wizytówkę'} icon={'search1'} onPress={() => navigation.navigate('SearchBusinessCards')} />
            <MenuItem text={'Wyloguj'} icon={'logout'} onPress={() => {global.user_id = null; navigation.navigate('SignIn'); }} />
        </ScrollView>
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
