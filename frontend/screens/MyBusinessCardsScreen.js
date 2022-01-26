import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../actions/search';
import serverAddress from '../constants/serverAddress';
import LoadingScreenModal from '../components/LoadingScreenModal';
import OverscreenModal from '../components/OverscreenModal';


const MyBusinessCardsScreen = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const businessCards = useSelector((state) => state.search.myBusinessCards);
    const getMyCardsTimestamp = useSelector((state) => state.search.getResponseTimestamp);
    const username = useSelector((state) => state.auth.username);
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [failureModalVisible, setFailureModalVisible] = useState(false);

    async function fetchBusinessCards() {
        setWaitingForResponse(true);
        await dispatch(searchActions.getMyBusinessCards(username));
        console.log(`Fetched my business cards`);
        setWaitingForResponse(false);
    };

    useEffect(() => {
        if (getMyCardsTimestamp === undefined)
            return;
        setWaitingForResponse(false);
        if (businessCards === null)
            setFailureModalVisible(true);
    }, [getMyCardsTimestamp]);

    useEffect(() => {
        fetchBusinessCards();
    }, [])

    function renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{flex: 2}} />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity
                            onPress={ navigation.goBack }
                            style={styles.backButton}>
                            <AntDesign name='back' size={28} color='#fff' />
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
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingVertical: 20 }}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Edit', {itemData: item}) }
                        style={{flex: 1, backgroundColor: 'white', elevation: 10, marginBottom: 15, marginHorizontal: 20, padding: 15, borderRadius: 20, alignItems: 'flex-start',}}
                    >
                        <View style={{backgroundColor: '#23272a', borderRadius: 20, overflow: 'hidden', marginBottom: 5}}>
                            <Image source={{uri: `http://${serverAddress.address}:8080/card/image?id=${item.id}`}} resizeMode='cover' style={{width: '100%', aspectRatio: 16/9}} />
                        </View>
                        {item.name !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 20, padding: 3,}}><Text>Nazwa: </Text><Text style={{fontWeight: "bold"}}>{item.name}</Text></Text>}
                        <Text style={{ fontFamily: 'open-sans', fontSize: 20, padding: 3,}}><Text>Status: </Text><Text style={{fontWeight: "bold"}}>{item.mode}</Text></Text>
                        {item.category !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 20, padding: 3,}}><Text>Profesja: </Text><Text style={{fontWeight: "bold"}}>{item.category}</Text></Text>}
                        {item.company !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 20, padding: 3,}}><Text>Firma: </Text><Text style={{fontWeight: "bold"}}>{item.company}</Text></Text>}
                        {item.phone !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 20, padding: 3,}}><Text>Telefon: </Text><Text style={{fontWeight: "bold"}}>{item.phone}</Text></Text>}
                        {item.email !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 20, padding: 3,}}><Text>E-mail: </Text><Text style={{fontWeight: "bold"}}>{item.email}</Text></Text>}
                    </TouchableOpacity>
                );
            }}
        />

        <TouchableOpacity
            onPress={() => navigation.navigate('Gallery') }
            style={{...styles.roundButton, bottom: 90}}>
            <AntDesign name='picture' size={50} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('Camera') }
            style={styles.roundButton}>
            <AntDesign name='camera' size={50} color='#fff' />
        </TouchableOpacity>

        <LoadingScreenModal amIVisible={Platform.OS === 'android' ? waitingForResponse : false} />
        <OverscreenModal
          title={"Wystąpił błąd"}
          message={"Nie udało się uzyskać odpowiedzi od serwera."}
          buttonType='arrowleft'
          onClick={() => setFailureModalVisible(false)}          
          amIVisible={failureModalVisible}
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
        fontSize: 28,
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