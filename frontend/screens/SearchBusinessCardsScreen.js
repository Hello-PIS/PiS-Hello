import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground, Dimensions, FlatList, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as ScreenOrientation from 'expo-screen-orientation';

const manufacturer_pic = [
    {name: 'audi', uri: 'https://www.carlogos.org/logo/Audi-logo-1999-1920x1080.png'},
    {name: 'bmw', uri: 'https://www.carlogos.org/car-logos/bmw-logo-1997-1200x1200.png'},
    {name: 'volkswagen', uri: 'https://www.carlogos.org/logo/Volkswagen-emblem-2014-1920x1080.png'},
    {name: 'ferrari', uri: 'https://www.carlogos.org/car-logos/scuderia-ferrari-logo-800x1050.png'},
    {name: 'porsche', uri: 'https://www.carlogos.org/car-logos/porsche-logo-950x1100.png'},
    {name: 'ford', uri: 'https://www.carlogos.org/car-logos/ford-logo-2017.png'},
    {name: 'tesla', uri: 'https://www.carlogos.org/car-logos/tesla-logo-2200x2800.png'},
    {name: 'mercedes-benz', uri: 'https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png'},
    {name: 'toyota', uri: 'https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png'},
]
  
const SearchBusinessCardsScreen = props => {
    const navigation = useNavigation();
    const [businessCards, setBusinessCards] = useState([]);
    const [textInputValue, setTextInputValue] = useState('');
    const [searchValue, setSearchValue] = useState(null);

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, [])

    const addPhoto = uri => {
        setBusinessCards([...businessCards, uri]);
    };

    function renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{flex: 3}} />
                <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                        <TouchableOpacity
                            onPress={ navigation.goBack }
                            style={styles.searchButton}>
                            <AntDesign name='back' size={26} color='#fff' style={{margin: 5,}} />
                        </TouchableOpacity>
                    <TextInput style={styles.searchBar} placeholder='Wpisz nazwę wizytówki...' onChangeText={setTextInputValue} value={textInputValue} />
                    <TouchableOpacity
                        onPress={ () => setSearchValue(textInputValue) }
                        style={styles.searchButton}>
                        <AntDesign name='search1' size={26} color='#fff' style={{margin: 5,}} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}} />
            </View>
        );
    }

    return <View style={{alignItems: 'center', flex: 1, }}>
        {renderHeader()}
        <FlatList
            style={{width: '100%'}}
            data={manufacturer_pic}
            keyExtractor={item => item.name}
            contentContainerStyle={{flexGrow: 1, paddingVertical: 20,}}
            renderItem={({item}) => {
                if (searchValue !== null && item.name.toLowerCase().includes(searchValue.toLowerCase()))
                    return<TouchableOpacity
                        style={{flex: 1, backgroundColor: 'white', elevation: 10, marginBottom: 15, marginHorizontal: 20, padding: 15, borderRadius: 20, alignItems: 'flex-start',}}
                    >
                        <Text style={{fontFamily: 'open-sans', fontSize: 30, width: '100%', textAlign: 'center', fontWeight: 'bold'}}>{item.name.toUpperCase()}</Text>
                        <View style={{backgroundColor: 'transparent', borderRadius: 20, overflow: 'hidden', marginBottom: 5}}>
                            <Image source={{uri: item.uri}} resizeMode='contain' style={{width: '100%', aspectRatio: 16/9}} />
                        </View>
                    </TouchableOpacity>
                else return <View />
            }}
        />
    </View>
};

const styles = StyleSheet.create({
    imagePicker: {
        //alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
    },

    roundButton: {
        width: 75,
        height: 75,
        margin: 20,
        borderRadius: 100,
        backgroundColor: '#9932CC',
        position: 'absolute',
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    title: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'open-sans-bold',
    },
    header: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9A58FF',
    },
    backButton: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    searchButton: {
        padding: 5,
        marginHorizontal: 5,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.25)',
        elevation: 3,
    },
    searchBar: {
        flexGrow: 1,
        backgroundColor: 'magenta',
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: 'white',
        elevation: 3,
        padding: 10,
        fontSize: 18,
    }
});

export default SearchBusinessCardsScreen;