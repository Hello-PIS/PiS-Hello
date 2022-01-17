import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground, Dimensions, FlatList } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';
import { useNavigation } from '@react-navigation/core';

const MyBusinessCardsScreen = props => {
    const navigation = useNavigation();

    const [businessCards, setBusinessCards] = useState([]);

    const addPhoto = uri => {
        setBusinessCards([...businessCards, uri]);
    };

    function renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{flex: 2}} />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity
                            onPress={ navigation.goBack }
                            style={styles.backButton}>
                            <AntDesign name='back' size={34} color='#fff' />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Moje wizytówki</Text>
                    <View style={{flex: 1}} />
                </View>
                <View style={{flex: 1}} />
            </View>
        );
    }

    return <View style={{alignItems: 'center', flex: 1, }}>
        {renderHeader()}
        <FlatList
            data={businessCards}
            keyExtractor={item => item}
            contentContainerStyle={{ paddingVertical: 20 }}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        style={{flex: 1, backgroundColor: 'white', elevation: 10, marginBottom: 15, marginHorizontal: 20, padding: 15, borderRadius: 20, alignItems: 'flex-start',}}
                    >
                        <View style={{backgroundColor: '#23272a', borderRadius: 20, overflow: 'hidden', marginBottom: 5}}>
                            <Image source={{uri: item}} resizeMode='cover' style={{width: '100%', aspectRatio: 16/9}} />
                        </View>
                        <Text style={{fontFamily: 'open-sans', fontSize: 20,}}><Text>Status: </Text><Text style={{fontWeight: "bold"}}>publiczny</Text></Text>
                        <Text style={{fontFamily: 'open-sans', fontSize: 20,}}><Text>Profesja: </Text><Text style={{fontWeight: "bold"}}>na razie żadna</Text></Text>
                        
                    </TouchableOpacity>
                );
            }}
        />
        
        <TouchableOpacity
            onPress={() => navigation.navigate('Camera', { setImageUri: addPhoto }) }
            style={styles.roundButton}>
            <AntDesign name='plus' size={50} color='#fff' />
        </TouchableOpacity>
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
        fontSize: 36,
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
    },
});

export default MyBusinessCardsScreen;